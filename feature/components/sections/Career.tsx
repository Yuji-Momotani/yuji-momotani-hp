type CareerItem = {
  period: string;
  title: string;
  description: string;
};

const careers: CareerItem[] = [
  {
    period: "2026.05 - 現在",
    title: "フリーランスエンジニア",
    description:
      "東京都の開発現場を中心に、最新の技術を最大限に活用したプロジェクトで成果を出しながら、そこで得た知見を地方の企業や事業にも還元していくことを目指しています。",
  },
  {
    period: "2024.06 - 2026.04",
    title: "株式会社TalentX / バックエンドエンジニア",
    description:
      "HRテック企業でGo、AWS、Terraformを用いたバックエンド開発を担当。Amazon BedrockによるAI機能、DynamoDB/SNS/SQS/Lambdaを用いた連携基盤、Cognitoを使った認証基盤などを設計・構築しました。",
  },
  {
    period: "2023.02 - 2024.05",
    title: "株式会社メンバーズ / エンジニア",
    description:
      "大手企業のWebアプリ開発に従事。JavaScriptのモダン化提案やペアプログラミングの導入を通じて、開発効率とチーム内の知識共有を改善しました。",
  },
  {
    period: "2020.04 - 2023.01",
    title: "株式会社ジェイテック / エンジニア",
    description:
      "岡山のSES企業でエンジニアとしてのキャリアを開始。大手印刷メーカーグループ向け資材管理システムをC#、.NET、JavaScriptで継続的に開発・運用しました。",
  },
  {
    period: "2015.04 - 2020.03",
    title: "広島県警 / 警察官",
    description:
      "警察学校卒業後、交番勤務を経て留置管理部門を担当。緊張感のある現場で、秩序を保つ責任感と状況を見極めて動く力を培いました。",
  },
];

export default function Career() {
  return (
    <section
      id="career"
      className="border-t border-border px-4 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">03.</span>
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
