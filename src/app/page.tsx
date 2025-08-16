"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Chat() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={25} className="p-2 bg-sidebar">
        One
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} className="p-2 bg-sidebar-accent">
        Two
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
