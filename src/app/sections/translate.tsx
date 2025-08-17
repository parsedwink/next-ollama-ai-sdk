"use client"

import { useState } from "react"
import { generate } from "@/app/actions"
import { readStreamableValue } from "@ai-sdk/rsc"

const demo = `The machinery is designed to minimise production downtime and the number of operators involved in the operation. The software autonomously monitors and adjusts the treatment, so that personnel do not need to be constantly near the plant.`

export default function Translate() {
  const [generation, setGeneration] = useState<string>("")

  return (
    <div>
      <button
        onClick={async () => {
          const { output } = await generate(demo)

          for await (const delta of readStreamableValue(output)) {
            setGeneration((currentGeneration) => `${currentGeneration}${delta}`)
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  )
}
