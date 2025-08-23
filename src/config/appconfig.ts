import { LLModel } from "./models"

export type LangCode = string

export interface LangDetails {
  code: LangCode
  name: string
  flag?: string
}

export const languages: Record<LangCode, LangDetails> = {
  ro: { code: "ro", name: "Romanian" },
  en: { code: "en", name: "English" },
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
