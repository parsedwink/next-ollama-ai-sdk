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

export default function Translate() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generation, setGeneration] = useState<string>("")

  async function submitText() {
    setIsLoading(true)
    const { output } = await generate(input)
    for await (const delta of readStreamableValue(output)) {
      setGeneration((currentGeneration) => `${currentGeneration}${delta}`)
    }
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
            <PromptInputTextarea
              placeholder="Text de tradus"
              id="input_source"
              className="min-h-[600px] resize-y field-sizing-fixed"
            />
            <PromptInputActions className="justify-end pt-2">
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
          </PromptInput>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          {/* output */}
          <Response>{generation}</Response>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
