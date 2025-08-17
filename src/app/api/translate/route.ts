/**
 * KAKA
 */
import { ollama } from "ollama-ai-provider-v2"
import { generateText, streamText } from "ai"
import { Jsoning, JSONValue } from "jsoning"

const db = new Jsoning("db/testdb.json")
const pairs = await db.all()

const model = ollama("hf.co/QuantFactory/EuroLLM-9B-Instruct-GGUF:Q4_K_M")

export async function POST(req: Request) {
  const { source }: { source: string } = await req.json()

  const examples = pairs.length ? "Exemple:\n" + buildExample(pairs) + "\n" : ""

  const user_prompt = `${examples}
  Tradu in limba romana, foloseste exemplele:${source}`

  const result = generateText({
    model,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}

function buildExample(pairs: Record<string, JSONValue>): string {
  return Object.entries(pairs)
    .map((k, v) => `${k}=${v}`)
    .join(",")
}
