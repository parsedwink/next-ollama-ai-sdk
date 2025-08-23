import { LLModel } from "./models"

export type LangCode = "ro" | "en" | "de" | "it"

export interface LangDetails {
  code: LangCode
  name: string
  flag?: string
}

export const appLanguages: Record<LangCode, LangDetails> = {
  ro: { code: "ro", name: "Romanian" },
  en: { code: "en", name: "English" },
  it: { code: "it", name: "Italian" },
  de: { code: "de", name: "Deutsch" },
}

export const devLLModel = new LLModel(
  "dev_model",
  "src/config/prompts/Quant_EuroLLM_9B.hbs",
  {
    provider: "ollama",
    model: "hf.co/QuantFactory/EuroLLM-9B-Instruct-GGUF:Q4_K_M",
    source_lang: "en",
    target_lang: "ro",
  },
)

const other_model = new LLModel(
  "other",
  "src/config/prompts/EuroLLM_Italian.hbs",
  {
    provider: "ollama",
    model: "jobautomation/OpenEuroLLM-Italian:latest",
    source_lang: "it",
    target_lang: "ro",
  },
)

export const appModels = {
  dev: devLLModel,
  other: other_model,
}
