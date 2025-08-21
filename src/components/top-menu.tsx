export function TopMenu() {
  return (
    <nav className="flex items-center text-sm font-medium max-sm:hidden">
      <MenuItem label="Tradu" url="#" />
      <MenuItem label="Docs" url="#" />
    </nav>
  )
}

function MenuItem({ label, url }: { label: string; url: string }) {
  return (
    <a
      className={
        "text-sidebar-foreground/50 hover:text-sidebar-foreground/70 transition-colors " +
        " [&[aria-current]]:text-sidebar-foreground before:content-['/'] before:px-4 before:text-sidebar-foreground/30 first:before:hidden"
      }
      href={url}
    >
      {label}
    </a>
  )
}
