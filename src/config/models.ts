import fs from "fs"
import Handlebars from "handlebars"
import { JSONValue } from "jsoning"
import { LangCode, appLanguages } from "./appconfig"

export interface LLModelProps {
  provider: string
  model: string
  source_lang: LangCode
  target_lang: LangCode
  prompt_template: TemplateSpecification
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

    let templateString = "Translate into Romanian: {{source}}"
    try {
      templateString = fs.readFileSync(prompt_template_source, "utf8")
    } catch (error) {
      console.log(
        `Error loading ${prompt_template_source}: ${JSON.stringify(error)}`,
      )
    }
    const template = Handlebars.compile(templateString)
    Handlebars.registerPartial(name, template)

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

    const source_lang = appLanguages[this.props.source_lang].name
    const target_lang = appLanguages[this.props.target_lang].name

    const prompt = Handlebars.partials[this.name]({
      source_lang,
      target_lang,
      definitions,
      source,
    })

    return prompt
  }
}

function buildExample(pairs: Record<string, JSONValue>): string {
  return Object.entries(pairs)
    .map(([k, v]) => `'${k}'='${v}'`)
    .join(",")
}
