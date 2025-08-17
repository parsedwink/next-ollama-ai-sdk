"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@ai-sdk/react"
import { useState } from "react"

export default function Translate() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()

  return (
    <form
      className="h-full"
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage({ text: input })
        setInput("")
      }}
    >
      <div className="flex flex-col w-full h-full gap-2">
        <Textarea
          id="result"
          className="w-full rounded-md border p-4 grow"
          placeholder=""
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
        </Textarea>

        <Textarea
          id="source"
          className="border border-accent rounded grow"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <div className="grow-0">
          <Button type="submit">Send</Button>
        </div>
      </div>
    </form>
  )
}
