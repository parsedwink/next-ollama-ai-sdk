"use client"
import useSWR from "swr"

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((r) => r.json())

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

export default function Pairs() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR("/api/db", fetcher)
  const all = data.all as Record<string, string>

  return (
    <div className="flex flex-col gap-2 p-2">
      <h3>Pairs</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">
                <Input name="key" placeholder="engleza" />
              </TableHead>
              <TableHead className="">
                <Input name="val" placeholder="romana" />
              </TableHead>
              <TableHead>
                <Button variant="default" size="icon" className="size-8">
                  <CirclePlusIcon />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          {/*  */}
          <TableBody>
            {Object.entries(all).map(([key, val]) => {
              return (
                <TableRow key={key}>
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
    </div>
  )
}
