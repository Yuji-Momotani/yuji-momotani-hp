type CareerItem = {
  period: string;
  title: string;
  description: string;
};

const careers: CareerItem[] = [
  {
    period: "20XX - 現在",
    title: "フリーランスエンジニアとして独立",
    description:
      "Web/モバイルアプリ開発を中心に、複数のクライアントと協業中。",
  },
  {
    period: "20XX - 20XX",
    title: "前職の役職 / 会社名",
    description: "在籍中の業務内容・成果などを記載してください。",
  },
  {
    period: "20XX - 20XX",
    title: "前々職の役職 / 会社名",
    description: "在籍中の業務内容・成果などを記載してください。",
  },
];

export default function Career() {
  return (
    <section
      id="career"
      className="border-t border-border bg-muted-background px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">04.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Career</h2>
        </div>
        <ol className="relative space-y-10 border-l-2 border-accent/30 pl-6 sm:pl-8">
          {careers.map((career) => (
            <li key={career.period + career.title} className="relative">
              <span className="absolute -left-[30px] top-1.5 size-3 rounded-full border-2 border-background bg-accent sm:-left-[38px]" />
              <p className="font-mono text-xs font-semibold text-accent">{career.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{career.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {career.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
