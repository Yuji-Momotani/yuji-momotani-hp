export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent" />
          <span className="size-2 rounded-full bg-accent/50" />
          <p className="ml-1 font-mono text-xs text-muted">
            © {year} Momotani Yuji
          </p>
        </div>
        <a href="#top" className="font-mono text-xs text-muted hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
