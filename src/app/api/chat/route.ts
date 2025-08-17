// import { openai } from "@ai-sdk/openai"
import { ollama } from "ollama-ai-provider-v2"
import { streamText, UIMessage, convertToModelMessages } from "ai"

// Allow streaming responses up to 50 seconds
export const maxDuration = 50

const model = ollama("hf.co/QuantFactory/EuroLLM-9B-Instruct-GGUF:Q4_K_M")

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
