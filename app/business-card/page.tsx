import Image from "next/image";
import Link from "next/link";
import "./business-card.css";

export const metadata = {
  title: "Business Card | Yuji Momotani",
  description: "桃谷優寿のフリーランスエンジニア名刺デザイン",
};

const contactItems = [
  { label: "Phone", value: "080-4268-5557" },
  { label: "Mail", value: "yuji.momotani256@gmail.com" },
  { label: "Address", value: "712-8007 岡山県倉敷市鶴の浦2-5-6" },
];

export default function BusinessCardPage() {
  return (
    <main className="business-card-page">
      <Link className="detail-link detail-link-top" href="/">
        <span>詳細はこちら</span>
        <span aria-hidden="true">→</span>
      </Link>

      <section className="card-sheet" aria-label="Business card design preview">
        <article className="business-card business-card-front" aria-label="Business card front">
          <div className="front-watermark" aria-hidden="true">
            桃
          </div>
          <Image
            src="/icon.svg"
            alt=""
            width={46}
            height={46}
            className="front-mark"
            priority
          />
          <div className="front-content">
            <p className="role-label">Freelance Engineer</p>
            <h1>桃谷優寿</h1>
            <p className="name-romaji">Yuji Momotani</p>
          </div>
          <p className="front-signature">Designing calm, reliable web systems.</p>
        </article>

        <article className="business-card business-card-back" aria-label="Business card back">
          <div className="back-heading">
            <span className="back-kicker">Yuji Momotani</span>
            <h2>Freelance Engineer</h2>
          </div>

          <div className="back-body">
            <dl className="contact-list">
              {contactItems.map((item) => (
                <div className="contact-row" key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="qr-slot" aria-label="QR code placement">
              <span className="qr-corner qr-corner-top-left" />
              <span className="qr-corner qr-corner-top-right" />
              <span className="qr-corner qr-corner-bottom-left" />
              <span className="qr-corner qr-corner-bottom-right" />
              <span className="qr-label">QR</span>
            </div>
          </div>

          <div className="back-footer">
            <span className="peach-dot" aria-hidden="true" />
            <span>Momotani Yuji</span>
          </div>
        </article>
      </section>

      <Link className="detail-link detail-link-bottom" href="/">
        <span>詳細はこちら</span>
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
