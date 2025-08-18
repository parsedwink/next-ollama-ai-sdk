"use client"

import useSWR, { SWRConfig } from "swr"
import useSWRMutation from "swr/mutation"

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json())

async function sendPost(
  url: string | URL | Request,
  { arg }: { arg: { key: string; val: string } },
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

async function sendDelete(
  url: string | URL | Request,
  { arg }: { arg: { key: string } },
) {
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Suspense, use, useEffect, useState } from "react"

import { Pill, PillButton, PillStatus } from "@/components/ui/kibo-ui/pill"
import { XIcon } from "lucide-react"

import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group"
import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base"

// ---

export default function Pairs() {
  const { data = { all: [] }, error } = useSWR("/api/db", fetcher, {
    suspense: true,
    fallbackData: { all: { " ": " " } },
  })
  const all = data.all as Record<string, string>

  const { trigger: triggerPost, isMutating } = useSWRMutation(
    "/api/db",
    sendPost,
  )

  //--- state
  const { trigger: triggerDelete } = useSWRMutation("/api/db", sendDelete)
  const [input_key, setInput_key] = useState("")
  const [input_val, setInput_val] = useState("")
  const [addOk, setAddOk] = useState(false)

  useEffect(() => {
    const ok = input_key.length > 0 && input_val.length > 0
    setAddOk(ok)
  }, [input_key, input_val])

  //--- handlers
  function handleDel(e: unknown, key: string) {
    triggerDelete({ key })
  }

  async function handleAdd() {
    if (!addOk) {
      return
    }
    try {
      // const result = await trigger({
      await triggerPost({
        key: input_key,
        val: input_key,
      })
    } catch (error) {
      console.log(`${error}`)
    }

    // reset
    setInput_key("")
    setInput_val("")
  }

  // ---

  if (error) {
    return <div className="bg-destructive">{`Error: ${error}`}</div>
  }

  return (
    <SWRConfig>
      <h3>Pairs</h3>

      <Suspense fallback={<div>loading...</div>}>
        <form id="form_add_pair">
          <div className="flex flex-col gap-2 p-2">
            {/* inputs group */}
            <ControlGroup>
              <ControlGroupItem>
                <InputBase>
                  <InputBaseControl>
                    <InputBaseInput
                      id="form_key"
                      placeholder="key"
                      onChange={(e) => setInput_key(e.target.value)}
                    />
                  </InputBaseControl>
                </InputBase>
              </ControlGroupItem>
              <ControlGroupItem>
                <InputBase>
                  <InputBaseControl>
                    <InputBaseInput
                      id="form_val"
                      placeholder="val"
                      onChange={(e) => setInput_val(e.target.value)}
                    />
                  </InputBaseControl>
                </InputBase>
              </ControlGroupItem>
              <ControlGroupItem>
                <Button disabled={!addOk} onClick={() => handleAdd()}>
                  <PlusIcon />
                </Button>
              </ControlGroupItem>
            </ControlGroup>

            {/* w/ pills */}

            <div className="flex flex-wrap gap-1">
              {Object.entries(all).map(([key, val]) => {
                return (
                  <Pill key={key}>
                    <PillStatus>{key}</PillStatus>
                    {val}
                    <PillButton
                      size="icon"
                      variant="ghost"
                      onClick={async (e) => handleDel(e, key)}
                    >
                      <XIcon className="text-neutral-500" size={12} />
                    </PillButton>
                  </Pill>
                )
              })}
            </div>

            {/* - */}
          </div>
        </form>
      </Suspense>
    </SWRConfig>
  )
}
