export default function About() {
  return (
    <section id="about" className="border-t border-border px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-mono text-sm font-semibold text-accent">01.</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h2>
        </div>
        <div className="grid gap-12 sm:grid-cols-5">
          <div className="sm:col-span-3">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              ここに自己紹介文が入ります。
              <br />
              バックグラウンド、得意領域、仕事に対する姿勢など、お会いした方に伝えたい情報を記載してください。
            </p>
          </div>
          <dl className="space-y-4 sm:col-span-2">
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-muted">Name</dt>
              <dd className="text-sm font-medium">桃谷 優寿 / Yuji Momotani</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-muted">Role</dt>
              <dd className="text-sm font-medium">Freelance Engineer</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-3">
              <dt className="text-sm text-muted">Based in</dt>
              <dd className="text-sm font-medium">岡山県 倉敷市</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
