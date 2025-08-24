import { LLModel } from "./models"

export type LangCode = "ro" | "en" | "de" | "it" | "cz"

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
  cz: { code: "cz", name: "Czech" },
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

const llmodel_it_ro = new LLModel(
  "EuroLLM Italian",
  "src/config/prompts/EuroLLM_ALL.hbs",
  {
    provider: "ollama",
    model: "jobautomation/OpenEuroLLM-Italian:latest",
    source_lang: "it",
    target_lang: "ro",
  },
)
const llmodel_de_ro = new LLModel(
  "EuroLLM Deutsch",
  "src/config/prompts/EuroLLM_ALL.hbs",
  {
    provider: "ollama",
    model: "jobautomation/OpenEuroLLM-German:latest",
    source_lang: "de",
    target_lang: "ro",
  },
)
const llmodel_cz_ro = new LLModel(
  "EuroLLM Deutsch",
  "src/config/prompts/EuroLLM_ALL.hbs",
  {
    provider: "ollama",
    model: "jobautomation/OpenEuroLLM-Czech:latest",
    source_lang: "cz",
    target_lang: "ro",
  },
)

export const appModels: Record<string, LLModel> = {
  dev: devLLModel,
  it_ro: llmodel_it_ro,
  de_ro: llmodel_de_ro,
  cz_ro: llmodel_cz_ro,
}
