import Handlebars from "handlebars"
import fs from "fs"
import { LangCode, languages } from "./appconfig"
import { JSONValue } from "jsoning"

export interface LLModelProps {
  provider: string
  model: string
  source_lang: LangCode
  target_lang: LangCode
  prompt_template: unknown
}

export class LLModel {
  name: string
  props: LLModelProps

  constructor(
    name: string,
    prompt_template_source: string,
    props: Omit<LLModelProps, "prompt_template">,
  ) {
    this.name = name
    const templateString = fs.readFileSync(prompt_template_source, "utf8")
    const template = Handlebars.compile(templateString)

    this.props = { ...props, prompt_template: template }
  }

  buildPrompt(
    source: string,
    examples: Record<string, JSONValue> = {},
  ): string {
    let definitions = ""

    if (Object.keys(examples).length > 0) {
      definitions = `Use these translations: ${buildExample(examples)}.`
    }

    const source_lang = languages[this.props.source_lang].name
    const target_lang = languages[this.props.target_lang].name

    return `Below is an instruction that describes a task, 
paired with an input that provides further context.
Write a response that appropriately completes the request.
### Instruction:
Translate the following sentences from ${source_lang} to ${target_lang}. ${definitions}
### Input:
${source}
### Response:`
  }
}

function buildExample(pairs: Record<string, JSONValue>): string {
  return Object.entries(pairs)
    .map(([k, v]) => `'${k}'='${v}'`)
    .join(",")
}
