"use server"

import { streamText } from "ai"
import { ollama } from "ollama-ai-provider-v2"
import { createStreamableValue } from "@ai-sdk/rsc"
import { Jsoning, JSONValue } from "jsoning"

const db = new Jsoning("db/testdb.json")
const pairs = await db.all()

const model = ollama("hf.co/QuantFactory/EuroLLM-9B-Instruct-GGUF:Q4_K_M")
// const model = ollama("jobautomation/OpenEuroLLM-Romanian:latest")

export async function generate(source: string) {
  const stream = createStreamableValue("")

  const prompt = buildPrompt(source, pairs)
  console.log(prompt)
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
    .map(([k, v]) => `'${k}'='${v}'`)
    .join(",")
}

function buildPrompt(
  source: string,
  examples: Record<string, JSONValue> = {},
  source_lang = "English",
  target_lang = "Romanian",
): string {
  let definitions = ""

  if (Object.keys(examples).length > 0) {
    definitions = `Use these definitions: ${buildExample(examples)}.`
  }

  return `Below is an instruction that describes a task, 
paired with an input that provides further context.
Write a response that appropriately completes the request.
### Instruction:
Translate the following sentences from ${source_lang} to ${target_lang}. ${definitions}
### Input:
${source}
### Response:`
}
