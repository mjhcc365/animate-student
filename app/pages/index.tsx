"use client";
import { demos, threeDemos } from "./config";
import CaseList from "./CaseList";
import Header from "./Header";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="mx-5 px-4 py-8">
        {/* Hero Section */}
        <HeroSection />
        <CaseList caseArray={demos.concat(threeDemos)} />
      </main>
    </div>
  );
}
