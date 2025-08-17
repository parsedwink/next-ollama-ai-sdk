"use client"

import useSWR, { SWRConfig } from "swr"
import useSWRMutation from "swr/mutation"

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json())

async function sendRequest(
  url: string | URL | Request,
  { arg }: { arg: { username: string } },
) {
  return fetch(url, {
    method: "POST",
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

export default function Pairs() {
  const { data = { all: [] }, error } = useSWR("/api/db", fetcher, {
    suspense: true,
    fallbackData: { all: { " ": " " } },
  })
  const all = data.all as Record<string, string>

  const { trigger, isMutating } = useSWRMutation("/api/db", sendRequest)

  if (error) {
    return <div className="bg-destructive">{`Error: ${error}`}</div>
  }

  return (
    <SWRConfig>
      <div className="flex flex-col gap-2 p-2">
        <h3>Pairs</h3>
        <Suspense fallback={<div>loading...</div>}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <Table>
              <TableHeader className="[&_tr]:border-b-0">
                <TableRow>
                  <TableHead className="">
                    <Input name="key" placeholder="engleza" />
                  </TableHead>
                  <TableHead className="">
                    <Input name="val" placeholder="romana" />
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="default"
                      size="icon"
                      className="size-8"
                      disabled={isMutating}
                      onClick={async () => {
                        try {
                          console.log("try")
                          // const result = await trigger({ username: "johndoe" })
                        } catch (e) {
                          // error handling
                        }
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
                        >
                          <X />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </form>
        </Suspense>
      </div>
    </SWRConfig>
  )
}
