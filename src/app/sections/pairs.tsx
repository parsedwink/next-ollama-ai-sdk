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
import { Input } from "@/components/ui/input"
import { CirclePlusIcon, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Suspense } from "react"

import { Pill, PillButton, PillStatus } from "@/components/ui/kibo-ui/pill"
import { XIcon } from "lucide-react"

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
  const { trigger: triggerDelete } = useSWRMutation("/api/db", sendDelete)

  function handleDel(e: unknown, key: string) {
    triggerDelete({ key })
  }

  if (error) {
    return <div className="bg-destructive">{`Error: ${error}`}</div>
  }

  return (
    <SWRConfig>
      <div className="flex flex-col gap-2 p-2">
        <h3>Pairs</h3>

        <Suspense fallback={<div>loading...</div>}>
          <form
            id="form_add_pair"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Table>
              <TableHeader className="[&_tr]:border-b-0">
                <TableRow>
                  <TableHead className="">
                    <Input id="form_key" placeholder="engleza" />
                  </TableHead>
                  <TableHead className="">
                    <Input id="form_val" placeholder="romana" />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="default"
                      size="icon"
                      className="size-8"
                      disabled={isMutating}
                      onClick={async () => {
                        const form_key = document.getElementById(
                          "form_key",
                        )! as HTMLInputElement
                        const form_val = document.getElementById(
                          "form_val",
                        )! as HTMLInputElement

                        try {
                          // const result = await trigger({
                          await triggerPost({
                            key: form_key.value,
                            val: form_val.value,
                          })
                        } catch (error) {
                          console.log(`${error}`)
                        }

                        // reset
                        form_key.value = ""
                        form_val.value = ""
                      }}
                    >
                      <CirclePlusIcon />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {/*  */}
              <TableBody>
                {Object.entries(all).map(([key, val]) => {
                  return (
                    <TableRow key={key} className="">
                      <TableCell className="font-medium">{key}</TableCell>
                      <TableCell>{val}</TableCell>
                      <TableCell className="">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted"
                          onClick={async (e) => handleDel(e, key)}
                        >
                          <X />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <hr className="mb-2" />
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
          </form>
        </Suspense>
      </div>
    </SWRConfig>
  )
}
