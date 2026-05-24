type Work = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
};

const works: Work[] = [
  {
    title: "プロジェクト名 1",
    description:
      "プロジェクトの概要をここに記載します。担当範囲、使用技術、成果などを簡潔にまとめてください。",
    tags: ["Next.js", "TypeScript", "AWS"],
  },
  {
    title: "プロジェクト名 2",
    description:
      "プロジェクトの概要をここに記載します。担当範囲、使用技術、成果などを簡潔にまとめてください。",
    tags: ["React Native", "Node.js"],
  },
  {
    title: "プロジェクト名 3",
    description:
      "プロジェクトの概要をここに記載します。担当範囲、使用技術、成果などを簡潔にまとめてください。",
    tags: ["Go", "PostgreSQL", "Docker"],
  },
];

export default function Works() {
  return (
    <section id="works" className="border-t border-border px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">03.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Works</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <article
              key={work.title}
              className="group flex flex-col rounded-2xl border border-border p-6 transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <h3 className="text-lg font-semibold">{work.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {work.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
