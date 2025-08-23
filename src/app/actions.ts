"use server"

import { devLLModel } from "@/config/appconfig"
import { createStreamableValue } from "@ai-sdk/rsc"
import { streamText } from "ai"
import { Jsoning } from "jsoning"
import { ollama } from "ollama-ai-provider-v2"

const db = new Jsoning("db/testdb.json")

const model = ollama(devLLModel.props.model)
// const model = ollama("jobautomation/OpenEuroLLM-Romanian:latest")

export async function generate(source: string) {
  const stream = createStreamableValue("")

  const pairs = await db.all()
  const prompt = devLLModel.buildPrompt(source, pairs)

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
