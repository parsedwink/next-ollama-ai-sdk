"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"

export default function Translate() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/translate",
    }),
  })

  return (
    <form
      className="h-full"
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage({ text: input })
        setInput("")
      }}
    >
      <div className="size-full">
        <div
          id="result"
          className="size-full rounded-md border p-4 h-6/12 overflow-auto"
        >
          {messages
            .filter((m) => m.role === "assistant")
            .map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.parts
                  .filter((p) => p.type === "text")
                  .map((part, i) => (
                    <div key={`${m.id}-${i}`}>{part.text}</div>
                  ))}
              </div>
            ))}
        </div>

        <Textarea
          id="source"
          className="border border-accent rounded h-5/12"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <div className="flex items-center justify-center p-2 h-1/12">
          <Button type="submit" className="w-2/6">
            Send
          </Button>
        </div>
      </div>
    </form>
  )
}
