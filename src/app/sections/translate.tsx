"use client"

import { useState } from "react"
import { generate } from "@/app/actions"
import { readStreamableValue } from "@ai-sdk/rsc"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input"
import { ArrowUp, Square } from "lucide-react"
import { Response } from "@/components/ai-elements/response"
import { Button } from "@/components/ui/button"
import CopyButton from "@/components/copy-button"

export default function Translate() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generation, setGeneration] = useState<string>("")

  async function submitText() {
    setIsLoading(true)
    setGeneration("")
    const { output } = await generate(input)
    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`)
    }
    setIsLoading(false)
  }

  const handleValueChange = (value: string) => {
    setInput(value)
  }

  return (
    <div className="size-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          {/* source input */}
          <PromptInput
            value={input}
            onValueChange={handleValueChange}
            isLoading={isLoading}
            onSubmit={submitText}
            className="w-full h-full max-w-(--breakpoint-md) rounded-none p-0"
          >
            <div className="relative size-full">
              <PromptInputTextarea
                placeholder="Text de tradus"
                id="input_source"
                className="min-h-full resize-y field-sizing-fixed"
              />
              <PromptInputActions className="justify-end pt-2 absolute top-2 right-2">
                <PromptInputAction tooltip={isLoading ? "Stop" : "Send"}>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={submitText}
                  >
                    {isLoading ? (
                      <Square className="size-5 fill-current" />
                    ) : (
                      <ArrowUp className="size-5" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </div>
          </PromptInput>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className="p-2 relative">
          <CopyButton />
          {/* output */}
          <Response className="b-2">{generation}</Response>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
