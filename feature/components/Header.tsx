import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type NavItem = {
  href: string;
  label: string;
};

const defaultAnchors: NavItem[] = [
  { href: "/#services", label: "Services" },
  { href: "/#strengths", label: "Strengths" },
  { href: "/#flow", label: "Flow" },
  { href: "/#contact", label: "Contact" },
];

const defaultPages: NavItem[] = [
  { href: "/profile", label: "Profile" },
  { href: "/business-card", label: "Business Card" },
];

type HeaderProps = {
  anchors?: NavItem[];
  pages?: NavItem[];
  homeHref?: string;
};

export default function Header({
  anchors = defaultAnchors,
  pages = defaultPages,
  homeHref = "/",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-8">
        <Link href={homeHref} className="flex items-center gap-2.5">
          <Image
            src="/icon.svg"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-2xl shadow-sm"
            priority
          />
          <span className="hidden font-mono text-xs font-semibold tracking-wider text-muted sm:inline">
            MOMOTANI YUJI
          </span>
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm">
            {anchors.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {pages.length > 0 && (
              <li className="ml-2 flex items-center gap-3 border-l border-border pl-6">
                {pages.map((item, index) => (
                  <Fragment key={item.href}>
                    {index > 0 && (
                      <span aria-hidden className="text-muted/50">
                        /
                      </span>
                    )}
                    <Link
                      href={item.href}
                      className="font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </Fragment>
                ))}
              </li>
            )}
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
