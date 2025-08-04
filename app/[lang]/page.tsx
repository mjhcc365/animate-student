import { demos, threeDemos } from "./config";
import CaseList from "./pages/CaseList";
import Header from "./pages/Header";
import HeroSection from "./pages/HeroSection";
import { getDictionary } from "./dictionaries";
import ClientWrapper from "./ClientWrapper";

interface PageProps {
  params: Promise<{ lang: "zh" | "en" }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header dict={dict} currentLang={lang} />
      {/* Main Content */}
      <main className="mx-5 px-4 py-8">
        {/* Hero Section */}
        <HeroSection dict={dict} />
        <CaseList caseArray={demos.concat(threeDemos)} dict={dict} />
      </main>

      {/* Client-side wrapper for Lenis and other client-side logic */}
      <ClientWrapper />
    </div>
  );
}
