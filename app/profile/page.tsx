import type { Metadata } from "next";
import Header from "@/feature/components/Header";
import Footer from "@/feature/components/Footer";
import About from "@/feature/components/sections/About";
import Skills from "@/feature/components/sections/Skills";
import Works from "@/feature/components/sections/Works";
import Career from "@/feature/components/sections/Career";

export const metadata: Metadata = {
  title: "Profile | 桃谷 優寿",
  description:
    "桃谷 優寿 (Yuji Momotani) のプロフィール、スキルセット、実績、経歴のご紹介です。",
};

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
  { href: "#career", label: "Career" },
  { href: "/", label: "Top" },
];

export default function ProfilePage() {
  return (
    <>
      <Header items={navItems} />
      <main className="flex-1">
        <section className="border-b border-border bg-accent-soft px-4 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Profile
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              エンジニアとしての歩み
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              これまでの経歴・身につけてきたスキル・関わったプロジェクトをまとめています。技術的な背景に関心のある方はこちらをご覧ください。
            </p>
          </div>
        </section>
        <About />
        <Skills />
        <Works />
        <Career />
      </main>
      <Footer />
    </>
  );
}
