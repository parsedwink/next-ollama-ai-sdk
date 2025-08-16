import { NextRequest, NextResponse } from "next/server"
import { Jsoning } from "jsoning"

const db = new Jsoning("db/testdb.json")

db.clear()
db.set("one", "unu")

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const key = searchParams.get("key") ?? "undefined"
  const val = (await db.get(key)) ?? "undefined"

  return NextResponse.json({ key, val })
}
