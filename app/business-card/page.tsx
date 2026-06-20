import Image from "next/image";
import Header from "@/feature/components/Header";
import styles from "./business-card.module.css";

export const metadata = {
  title: "Business Card | Yuji Momotani",
  description: "桃谷優寿のフリーランスエンジニア名刺デザイン",
};

const pageItems = [
  { href: "/", label: "Top" },
  { href: "/profile", label: "Profile" },
];

const contactItems = [
  { label: "Phone", value: "080-4268-5557" },
  { label: "Mail", value: "yuji.momotani256@gmail.com" },
  { label: "Address", value: ["712-8007", "岡山県倉敷市鶴の浦2-5-6"] },
];

const xUrl = "https://x.com/uz1016peach?s=21&t=4m7qmBA1sGdSe7b2kWWz9g";

const instagramUrl =
  "https://www.instagram.com/yuzi8757momotani?igsh=MXFyN3pmNjNoY20yNA%3D%3D&utm_source=qr";

const githubUrl = "https://github.com/Yuji-Momotani";

const lineUrl = "https://lin.ee/Xa9aeab";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.36 10.31c0-3.45-3.46-6.26-7.71-6.26S3.94 6.86 3.94 10.31c0 3.09 2.74 5.68 6.44 6.17.25.05.59.16.68.37.08.19.05.48.03.67l-.11.64c-.03.19-.16.75.67.41.83-.35 4.46-2.63 6.09-4.51 1.13-1.24 1.62-2.51 1.62-3.75Zm-10.7 1.98H7.12a.42.42 0 0 1-.42-.42V8.86a.42.42 0 1 1 .84 0v2.59h1.12a.42.42 0 1 1 0 .84Zm1.6-.42a.42.42 0 1 1-.84 0V8.86a.42.42 0 1 1 .84 0v3.01Zm3.28 0a.42.42 0 0 1-.76.25l-1.45-1.96v1.71a.42.42 0 1 1-.84 0V8.86a.42.42 0 0 1 .76-.25l1.45 1.96V8.86a.42.42 0 1 1 .84 0v3.01Zm2.57-1.93a.42.42 0 1 1 0 .84h-1.12v.67h1.12a.42.42 0 1 1 0 .84h-1.54a.42.42 0 0 1-.42-.42V8.86a.42.42 0 0 1 .42-.42h1.54a.42.42 0 1 1 0 .84h-1.12v.66h1.12Z" />
    </svg>
  );
}

function PawPrint({ variant }: { variant: string }) {
  return (
    <span className={`${styles.pawPrint} ${variant}`}>
      <span className={`${styles.pawToe} ${styles.pawToe1}`} />
      <span className={`${styles.pawToe} ${styles.pawToe2}`} />
      <span className={`${styles.pawToe} ${styles.pawToe3}`} />
      <span className={`${styles.pawToe} ${styles.pawToe4}`} />
      <span className={styles.pawPad} />
    </span>
  );
}

export default function BusinessCardPage() {
  return (
    <>
      <Header anchors={[]} pages={pageItems} />
      <main className={styles.page}>
        <section
          className={styles.cardSheet}
          aria-label="Business card design preview"
        >
          <article
            className={`${styles.card} ${styles.cardFront}`}
            aria-label="Business card front"
          >
            <div className={styles.frontWatermark} aria-hidden="true">
              桃
            </div>
            <div className={styles.frontPaws} aria-hidden="true">
              <PawPrint variant={styles.pawPrintOne} />
              <PawPrint variant={styles.pawPrintTwo} />
            </div>
            <Image
              src="/icon.svg"
              alt=""
              width={46}
              height={46}
              className={styles.frontMark}
              priority
            />
            <div className={styles.frontContent}>
              <p className={styles.roleLabel}>Freelance Engineer</p>
              <h1>桃谷優寿</h1>
              <p className={styles.nameRomaji}>Yuji Momotani</p>
            </div>
            <p className={styles.frontSignature}>
              Designing calm, reliable web systems.
            </p>
          </article>

          <article
            className={`${styles.card} ${styles.cardBack}`}
            aria-label="Business card back"
          >
            <div className={styles.backHeading}>
              <span className={styles.backKicker}>Yuji Momotani</span>
              <h2>Freelance Engineer</h2>
            </div>

            <div className={styles.backBody}>
              <dl className={styles.contactList}>
                {contactItems.map((item) => (
                  <div className={styles.contactRow} key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>
                      {Array.isArray(item.value)
                        ? item.value.map((line) => (
                            <span key={line}>{line}</span>
                          ))
                        : item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.backFooter}>
              <span className={styles.peachDot} aria-hidden="true" />
              <span>Momotani Yuji</span>
            </div>
          </article>
        </section>

        <nav className={styles.socialLinks} aria-label="SNS links">
          <a
            className={`${styles.socialLink} ${styles.xLink}`}
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (新しいタブで開く)"
          >
            <XIcon />
            <span>X</span>
          </a>
          <a
            className={`${styles.socialLink} ${styles.instagramLink}`}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (新しいタブで開く)"
          >
            <InstagramIcon />
            <span>Instagram</span>
          </a>
          <a
            className={`${styles.socialLink} ${styles.lineLink}`}
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LINE (新しいタブで開く)"
          >
            <LineIcon />
            <span>LINE</span>
          </a>
          <a
            className={`${styles.socialLink} ${styles.githubLink}`}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (新しいタブで開く)"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </nav>
      </main>
    </>
  );
}
