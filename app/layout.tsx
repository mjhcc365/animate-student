import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animate Student",
  description: "网站特效案例库 - 收集和展示现代网站动画效果",
};

// 支持的语言列表
const locales = ["zh", "en"] as const;

// 生成静态参数
export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 验证语言参数
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "zh" | "en" }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
