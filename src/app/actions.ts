"use server"

import { streamText } from "ai"
import { ollama } from "ollama-ai-provider-v2"
import { createStreamableValue } from "@ai-sdk/rsc"
import { Jsoning, JSONValue } from "jsoning"

const db = new Jsoning("db/testdb.json")
const pairs = await db.all()
const model = ollama("hf.co/QuantFactory/EuroLLM-9B-Instruct-GGUF:Q4_K_M")

export async function generate(source: string) {
  const stream = createStreamableValue("")
  const examples = pairs.length ? "Exemple:\n" + buildExample(pairs) + "\n" : ""

  const prompt = `${examples}
  Tradu in limba romana, foloseste exemplele:${source}`

  ;(async () => {
    const { textStream } = streamText({
      model,
      prompt,
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}

function buildExample(pairs: Record<string, JSONValue>): string {
  return Object.entries(pairs)
    .map((k, v) => `${k}=${v}`)
    .join(",")
}
