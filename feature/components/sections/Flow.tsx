type FlowStep = {
  label: string;
  title: string;
  description: string;
};

const steps: FlowStep[] = [
  {
    label: "STEP 01",
    title: "お問い合わせ",
    description:
      "メールまたはお電話でお気軽にご連絡ください。お悩みの段階での内容でも問題ありません。",
  },
  {
    label: "STEP 02",
    title: "ヒアリング(無料)",
    description:
      "オンラインまたは対面で現状の課題を伺います。費用は一切かかりませんのでご安心ください。",
  },
  {
    label: "STEP 03",
    title: "ご提案・お見積もり",
    description:
      "課題に合った進め方とお見積もりをご提示します。複数案をご提案することもあります。",
  },
  {
    label: "STEP 04",
    title: "開発・実装",
    description:
      "進捗を共有しながら進めます。途中での仕様変更も柔軟に対応可能です。",
  },
  {
    label: "STEP 05",
    title: "納品・運用サポート",
    description:
      "納品後も運用しながらの改善や追加開発のご相談を承ります。",
  },
];

export default function Flow() {
  return (
    <section id="flow" className="border-t border-border px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">03.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Flow</h2>
        </div>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          初めての方でも安心してご相談いただけるよう、進め方をご紹介します。
        </p>
        <ol className="relative space-y-8 border-l-2 border-accent/30 pl-6 sm:pl-10">
          {steps.map((step) => (
            <li key={step.label} className="relative">
              <span className="absolute -left-[30px] top-1.5 size-3 rounded-full border-2 border-background bg-accent sm:-left-[46px] sm:size-4" />
              <p className="font-mono text-xs font-bold tracking-wider text-accent">
                {step.label}
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
