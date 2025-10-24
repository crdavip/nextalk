export async function POST(req: Request) {
  const body = await req.json()
  const messages = body.messages || []

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) {
    return new Response(JSON.stringify({ error: "Missing OpenAI API key" }), { status: 500 })
  }

  // OpenAI Chat Completions API
  const payload = {
    model: "gpt-4o-mini", // Rápido, económico y muy capaz
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
    max_tokens: 1000,
    top_p: 0.95,
    stream: true
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok || !res.body) {
    const errorText = await res.text()
    console.error("OpenAI API error:", {
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

  // Transform OpenAI stream to your client format
  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

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