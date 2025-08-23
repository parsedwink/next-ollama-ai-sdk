"use server"

import { appModels } from "@/config/appconfig"
import { createStreamableValue } from "@ai-sdk/rsc"
import { streamText } from "ai"
import { Jsoning } from "jsoning"
import { ollama } from "ollama-ai-provider-v2"

const db = new Jsoning("db/testdb.json")

export async function generate(source: string, model_name: string) {
  const stream = createStreamableValue("")

  console.log(model_name)
  const pairs = await db.all()
  const llModel = appModels[model_name]
  const model = ollama(llModel.props.model)

  const prompt = llModel.buildPrompt(source, pairs)

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
