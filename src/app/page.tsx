"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Translate from "./sections/translate"
import Pairs from "./sections/pairs"

export default function Chat() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={25} className="p-2 bg-sidebar">
        <Pairs />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} className="p-2 bg-sidebar-accent">
        <Translate />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
