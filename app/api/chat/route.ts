import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database.types'

export async function POST(req: Request) {
  const body = await req.json()
  const messages = body.messages || []
  const providedConversationId = body.conversationId as string | undefined

  const GROQ_KEY = process.env.GROQ_API_KEY
  if (!GROQ_KEY) {
    return new Response(JSON.stringify({ error: "Missing Groq API key" }), { status: 500 })
  }

  // Create a Supabase service-role client for server-side persistence
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  ) as any // we don't strictly need full typing here

  // Groq uses OpenAI-compatible format
  const payload = {
    model: "llama-3.3-70b-versatile", // Modelo más reciente y potente
    messages: [
      {
        role: "system",
        content: "Eres un asistente útil y amigable. SIEMPRE debes responder en español, sin importar el idioma de la pregunta. Sé claro, conciso y profesional."
      },
      ...messages.map((msg: {role: string, content: string}) => ({
        role: msg.role,
        content: msg.content
      }))
    ],
    temperature: 0.7,
    max_tokens: 500,
    top_p: 0.95,
    stream: true // TRUE streaming support!
  }

  // Persist the user message and ensure a conversation exists
  let conversationId = providedConversationId || null

  try {
    // If no conversation id provided, create one
    if (!conversationId) {
      const { data: convData, error: convErr } = await supabase
        .from('conversations')
        .insert({ name: 'Nueva conversación', is_active: true })
        .select()
        .limit(1)

      if (convErr) throw convErr
      conversationId = convData?.[0]?.id
    }

    // Find the last user message in the provided messages (assumed to be the new message)
    let userMessageContent = ''
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessageContent = messages[i].content
        break
      }
    }

    if (userMessageContent) {
      const { error: msgErr } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: null,
          role: 'user',
          content: userMessageContent,
          is_streaming: false,
        })

      if (msgErr) throw msgErr
    }
  } catch (err) {
    console.error('Failed to persist user message:', err)
    // proceed — we still want to call the model even if DB write failed
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok || !res.body) {
    const errorText = await res.text()
    console.error("Groq API error:", {
      status: res.status,
      statusText: res.statusText,
      body: errorText
    })
    return new Response(
      JSON.stringify({ 
        error: "Error del servicio de IA", 
        details: errorText,
        status: res.status 
      }), 
      { status: res.status }
    )
  }

  // Transform Groq's OpenAI-compatible stream to your client format
  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let assistantText = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          buffer += decoder.decode(value, { stream: true })

          // Process complete lines
          const lines = buffer.split("\n")
          buffer = lines.pop() || "" // Keep incomplete line in buffer

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed || trimmed === "data: [DONE]") {
              continue
            }

            if (trimmed.startsWith("data: ")) {
              try {
                const data = trimmed.slice(6)
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                
                if (content) {
                  // Frame the chunk in your client's expected format
                  const framed = `0:${JSON.stringify(content)}\n`
                  controller.enqueue(new TextEncoder().encode(framed))
                  // accumulate for DB persistence
                  assistantText += content
                }
              } catch (err) {
                console.error("Stream parse error:", err)
              }
            }
          }
        }
      } catch (err) {
        console.error("Stream error:", err)
      } finally {
        // Persist assistant message to DB if we have content and conversationId
        try {
          if (assistantText && conversationId) {
            await supabase.from('messages').insert({
              conversation_id: conversationId,
              sender_id: null,
              role: 'assistant',
              content: assistantText,
              is_streaming: false,
            })
          }
        } catch (dbErr) {
          console.error('Failed to persist assistant message:', dbErr)
        }

        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  })
}