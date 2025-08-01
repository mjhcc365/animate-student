"use client";
import Link from "next/link";

import { demos, threeDemos } from "./config";
import CaseList from "./CaseList";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col justify-between items-start h-auto py-4 gap-4">
            <div className="flex flex-col items-start space-y-2">
              <h1 className="text-xl font-bold ">Animate Student</h1>
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-full self-start">
                网站特效案例库
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-slate-400 text-center">
                收集和展示现代网站动画效果
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-5 px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-3">动画效果资源库</h2>
          <p className="text-base text-slate-400 max-w-3xl mx-auto px-4">
            这里收集了各种现代网站动画效果，包括CSS动画、Three.js
            3D效果、着色器等。 每个演示都包含完整的代码和说明。
          </p>
        </div>
        <CaseList caseArray={demos.concat(threeDemos)} />
        {/* Footer */}
        <footer className="text-center py-6 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            © 2024 Animate Student. 收集和展示现代网站动画效果。
          </p>
        </footer>
      </main>
    </div>
  );
}
