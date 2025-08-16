"use client"
import useSWR from "swr"

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json())

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlusIcon } from "lucide-react"

export default function Pairs() {
  const { data, error, isLoading } = useSWR("/api/db", fetcher)
  const all = data.all as Record<string, string>

  return (
    <div className="w-xl flex flex-col gap-2 p-2">
      <h3>Pairs</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="flex flex-row gap-1 items-center">
          <Input name="key" placeholder="engleza" />
          <Input name="val" placeholder="romana" />
          <Button variant="secondary" size="icon" className="size-8">
            <CirclePlusIcon />
          </Button>
        </div>
        <div>
          {
            //
            Object.entries(all).map(([key, val]) => {
              return (
                <div key={key}>
                  {key}:{val}
                </div>
              )
            })
          }
        </div>
      </form>
    </div>
  )
}
