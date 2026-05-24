import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

const defaultNavItems: NavItem[] = [
  { href: "/#services", label: "Services" },
  { href: "/#strengths", label: "Strengths" },
  { href: "/#flow", label: "Flow" },
  { href: "/#contact", label: "Contact" },
  { href: "/profile", label: "Profile" },
];

type HeaderProps = {
  items?: NavItem[];
  homeHref?: string;
};

export default function Header({
  items = defaultNavItems,
  homeHref = "/",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link href={homeHref} className="flex items-center gap-2.5">
          <span className="flex size-9 flex-col items-center justify-center rounded-full border-2 border-accent text-[10px] font-bold leading-[1.1] tracking-tight text-accent">
            <span>Y</span>
            <span>M</span>
          </span>
          <span className="hidden font-mono text-xs font-semibold tracking-wider text-muted sm:inline">
            MOMOTANI YUJI
          </span>
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-9 items-center justify-center rounded-full bg-accent px-4 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:hidden"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
