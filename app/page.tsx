import Header from "@/feature/components/Header";
import Footer from "@/feature/components/Footer";
import Hero from "@/feature/components/sections/Hero";
import Services from "@/feature/components/sections/Services";
import Strengths from "@/feature/components/sections/Strengths";
import Flow from "@/feature/components/sections/Flow";
import Contact from "@/feature/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Strengths />
        <Flow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
