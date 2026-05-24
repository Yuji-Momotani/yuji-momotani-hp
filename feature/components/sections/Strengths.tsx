type Strength = {
  title: string;
  description: string;
};

const strengths: Strength[] = [
  {
    title: "一気通貫で対応",
    description:
      "ご相談・要件整理から実装・運用改善まで一人で担当します。複数の業者を取りまとめる手間がかからず、責任の所在も明確です。",
  },
  {
    title: "中小企業に合った規模感",
    description:
      "大規模システムに合わせた過剰な設計はしません。本当に必要な機能だけを、最短ルートで形にすることを大切にしています。",
  },
  {
    title: "業務に合わせたオーダーメイド",
    description:
      "既製品ではフィットしない業務にも、御社の進め方に合わせて柔軟に設計・開発します。",
  },
  {
    title: "納品後も継続サポート",
    description:
      "作って終わりではなく、運用しながらの改善・拡張までお手伝いします。長期的なパートナーとしてご活用ください。",
  },
];

export default function Strengths() {
  return (
    <section
      id="strengths"
      className="border-t border-border bg-muted-background px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">02.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Strengths</h2>
        </div>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          安心してお任せいただくために、大切にしている4つのことです。
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {strengths.map((strength, index) => (
            <div
              key={strength.title}
              className="rounded-2xl border border-border bg-background p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-accent-foreground">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                  {strength.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
