import { NextRequest, NextResponse } from "next/server"
import { Jsoning } from "jsoning"

const db = new Jsoning("db/testdb.json")

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const key = searchParams.get("key")

  if (key) {
    const val = (await db.get(key)) ?? "UNDEFINED"
    return NextResponse.json({ key, val })
  } else {
    const all = await db.all()
    return NextResponse.json({ all })
  }
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { key, val } = body

  await db.set(key, val)
  return NextResponse.json({ result: "ok" }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { key } = body

  await db.delete(key)
  return NextResponse.json({ result: "ok" }, { status: 202 })
}
