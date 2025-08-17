"use client"

import { Button } from "@/components/ui/button"
import { useChat } from "@ai-sdk/react"
import { useState } from "react"

export default function Translate() {
  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()
  return (
    <div className="flex flex-col w-full">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case "text":
                return <div key={`${message.id}-${i}`}>{part.text}</div>
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <textarea
          className="border border-accent rounded"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
