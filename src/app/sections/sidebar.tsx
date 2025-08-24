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
import Image from "next/image"
import { appLanguages } from "@/config/appconfig"
import LangFlag from "@/components/lang-flag"

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
          <LangFlag code="en" />
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
