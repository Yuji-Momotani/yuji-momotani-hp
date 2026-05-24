type Service = {
  title: string;
  problem: string;
  solution: string;
  examples: string[];
};

const services: Service[] = [
  {
    title: "業務の自動化",
    problem: "毎月の集計やデータ入力に何日も取られていませんか？",
    solution:
      "手作業で行っている定型業務を自動化し、本来の業務に集中できる時間を取り戻します。",
    examples: ["Excelでの集計作業", "システム間のデータ転記", "請求書・レポート作成"],
  },
  {
    title: "業務システム開発",
    problem: "Excel管理に限界を感じていませんか？",
    solution:
      "業務に合わせた専用ツールを開発し、複数人での同時編集やミス防止を実現します。",
    examples: ["顧客管理", "在庫管理", "予約・スケジュール管理"],
  },
  {
    title: "Webサイト制作・改善",
    problem: "スマホで見にくい、集客に活かせていないサイトはありませんか？",
    solution:
      "見た目を整えるだけでなく、問い合わせや採用につながる導線まで設計します。",
    examples: ["コーポレートサイト", "サービスLP", "既存サイトのリニューアル"],
  },
  {
    title: "既存ツールの連携",
    problem: "複数のSaaSを行き来して時間を浪費していませんか？",
    solution:
      "お使いのツール同士をつなぎ、情報の二重入力や確認漏れを減らします。",
    examples: ["Slack / Notion / Google連携", "API連携", "通知・自動化フロー"],
  },
  {
    title: "AI活用支援",
    problem: "AIで何ができるか分からず、導入を迷っていませんか？",
    solution:
      "御社の業務を伺った上で、効果が出やすい領域から無理なく導入を支援します。",
    examples: ["問い合わせ対応の効率化", "資料・文書の要約", "業務へのAI組み込み"],
  },
  {
    title: "技術アドバイザリー",
    problem: "IT・技術まわりの相談相手がいなくて困っていませんか？",
    solution:
      "外部の技術パートナーとして、システム選定・既存業者との折衝などを支援します。",
    examples: ["顧問契約", "スポット相談", "既存システムのセカンドオピニオン"],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-border px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">01.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Services</h2>
        </div>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          技術そのものではなく、技術を使って解決できる<strong className="text-foreground">現場の課題</strong>に焦点を当てて支援します。
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent sm:p-8"
            >
              <span className="font-mono text-xs font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-accent sm:text-base">
                「{service.problem}」
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {service.solution}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.examples.map((example) => (
                  <li
                    key={example}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs text-accent-strong"
                  >
                    {example}
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
