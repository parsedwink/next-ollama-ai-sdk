"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group"
import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base"
import { Pill, PillButton, PillStatus } from "@/components/ui/kibo-ui/pill"
import { PlusIcon, XIcon } from "lucide-react"

export default function Pairs() {
  //--- state
  const [pairs, setPairs] = useState<Record<string, string>>({})
  const [input_key, setInput_key] = useState("")
  const [input_val, setInput_val] = useState("")
  const [addOk, setAddOk] = useState(false)

  useEffect(() => {
    const ok = input_key.length > 0 && input_val.length > 0
    setAddOk(ok)
  }, [input_key, input_val])

  //--- handlers
  async function handleDel(e: unknown, key: string) {
    const result = await fetch("/api/db", {
      method: "DELETE",
      body: JSON.stringify({ key }),
    })

    if (result.status === 202) {
      const newPairs = Object.assign({}, pairs)
      delete newPairs[key]
      setPairs(newPairs)
    }
  }

  async function handleAdd() {
    if (!addOk) {
      return
    }
    try {
      await fetch("/api/db", {
        method: "POST",
        body: JSON.stringify({
          key: input_key,
          val: input_val,
        }),
      })
    } catch (error) {
      console.log(`${error}`)
    }
    const newPairs = Object.assign({}, pairs)
    newPairs[input_key] = input_val
    setPairs(newPairs)
    setInput_key("")
    setInput_val("")
  }

  useEffect(() => {
    fetch("/api/db")
      .then((response) => response.json())
      .then((data) => {
        setPairs(data.all)
      })
  }, [])

  return (
    <div>
      <form id="form_add_pair" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2 p-2">
          {/* inputs group */}
          <ControlGroup>
            <ControlGroupItem>
              <InputBase>
                <InputBaseControl>
                  <InputBaseInput
                    id="form_key"
                    placeholder="sursa"
                    value={input_key ?? ""}
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
                    placeholder="traducere"
                    value={input_val ?? ""}
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

          {/* pills list */}

          <div className="flex flex-wrap gap-1">
            {Object.entries(pairs).map(([key, val]) => {
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
    </div>
  )
}
