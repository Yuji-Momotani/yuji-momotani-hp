"use client";

import Link from "next/link";
import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  anchors: NavItem[];
  pages: NavItem[];
};

export default function MobileMenu({ anchors, pages }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const mounted = useIsMounted();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <Fragment>
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[60] flex w-80 max-w-[85vw] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="メニュー"
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent">
            MENU
          </span>
          <button
            type="button"
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent-soft"
            aria-label="メニューを閉じる"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-1">
            {anchors.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center justify-between border-b border-border py-4 text-base font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {pages.length > 0 && (
            <div className="mt-8">
              <p className="mb-2 font-mono text-xs font-bold tracking-[0.2em] text-muted">
                PAGES
              </p>
              <ul className="space-y-1">
                {pages.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      tabIndex={open ? 0 : -1}
                      className="flex items-center justify-between border-b border-border py-3 text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {item.label}
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </aside>
    </Fragment>
  );

  return (
    <Fragment>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent-soft"
        aria-label="メニューを開く"
        aria-expanded={open}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {mounted && createPortal(drawer, document.body)}
    </Fragment>
  );
}
