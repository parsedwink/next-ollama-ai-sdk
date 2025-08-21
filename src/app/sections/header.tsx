import { TopMenu } from "@/components/top-menu"
import { SidebarTrigger } from "@/components/ui/sidebar-better"

export function Header() {
  return (
    <header className="dark flex h-16 shrink-0 items-center gap-2 px-4 md:px-6 lg:px-8 bg-sidebar text-sidebar-foreground relative before:absolute before:inset-y-3 before:-left-px before:w-px before:bg-gradient-to-b before:from-white/5 before:via-white/15 before:to-white/5 before:z-50">
      <SidebarTrigger className="-ms-2" />
      <div className="flex items-center gap-8 ml-auto">
        <TopMenu />
      </div>
    </header>
  )
}
