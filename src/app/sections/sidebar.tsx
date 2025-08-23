"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar-better"

import Pairs from "./pairs"

// shadcn demo
import { data } from "@/config/demo-sidebar-data"
import { ModelSwitcher } from "@/components/model-switcher"
import { ModeToggle } from "@/components/mode-toggle"

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <ModelSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Traduceri</SidebarGroupLabel>
          <Pairs />
          <p className="font-bold p-1 rounded-full bg-amber-700 text-center">
            load/save pairs
          </p>
        </SidebarGroup>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
