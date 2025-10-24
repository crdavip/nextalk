import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    messages,
    system: "Eres un asistente útil y amigable. Responde de manera clara y concisa en español.",
  })

  return result.toUIMessageStreamResponse()
}
