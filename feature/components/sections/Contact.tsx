type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

const items: ContactItem[] = [
  {
    label: "PHONE",
    value: "080-4268-5557",
    href: "tel:+819042685557",
  },
  {
    label: "MAIL",
    value: "yuji.momotani256@gmail.com",
    href: "mailto:yuji.momotani256@gmail.com",
  },
  {
    label: "ADDRESS",
    value: "712-8007 岡山県倉敷市鶴の浦2-5-6",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">04.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h2>
        </div>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          お仕事のご相談・ご依頼はメールまたはお電話よりお気軽にご連絡ください。
        </p>

        <div className="overflow-hidden rounded-3xl border border-border bg-background">
          <div className="border-b border-border bg-accent-soft px-6 py-5 sm:px-8">
            <p className="font-mono text-xs font-semibold tracking-wider text-accent">
              Yuji Momotani
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Freelance Engineer
            </p>
          </div>
          <ul className="divide-y divide-border px-6 sm:px-8">
            {items.map((item) => {
              const content = (
                <>
                  <span className="font-mono text-xs font-semibold tracking-wider text-accent sm:w-32">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium sm:text-base">{item.value}</span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex flex-col gap-1 py-5 transition-colors hover:text-accent sm:flex-row sm:items-center sm:gap-6"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:gap-6">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
