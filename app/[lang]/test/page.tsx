import { getDictionary } from "../dictionaries";

interface TestPageProps {
  params: Promise<{ lang: "zh" | "en" }>;
}

export default async function TestPage({ params }: TestPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">国际化测试页面</h1>

        <div className="space-y-6">
          <div className="bg-stone-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">当前语言信息</h2>
            <p>
              <strong>语言代码:</strong> {lang}
            </p>
            <p>
              <strong>网站标题:</strong> {dict.common.siteTitle}
            </p>
            <p>
              <strong>英雄标题:</strong> {dict.hero.title}
            </p>
            <p>
              <strong>英雄描述:</strong> {dict.hero.description}
            </p>
          </div>

          <div className="bg-stone-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">导航菜单</h2>
            <div className="flex space-x-4">
              <span>{dict.navigation.home}</span>
              <span>{dict.navigation.demos}</span>
              <span>{dict.navigation.about}</span>
              <span>{dict.navigation.contact}</span>
            </div>
          </div>

          <div className="bg-stone-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">演示分类</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>CSS动画:</strong> {dict.demos.categories.cssAnimations}
              </div>
              <div>
                <strong>产品展示:</strong>{" "}
                {dict.demos.categories.productShowcase}
              </div>
              <div>
                <strong>基础:</strong> {dict.demos.categories.fundamentals}
              </div>
              <div>
                <strong>导航:</strong> {dict.demos.categories.navigation}
              </div>
            </div>
          </div>

          <div className="bg-stone-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">状态标签</h2>
            <div className="flex space-x-4">
              <span className="bg-green-600 px-2 py-1 rounded text-sm">
                {dict.demos.status.new}
              </span>
              <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                {dict.demos.status.updated}
              </span>
              <span className="bg-orange-600 px-2 py-1 rounded text-sm">
                {dict.demos.status.popular}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-700">
          <p className="text-stone-400">
            访问{" "}
            <a href="/zh/test" className="text-blue-400 hover:underline">
              中文版本
            </a>{" "}
            |
            <a href="/en/test" className="text-blue-400 hover:underline ml-2">
              English Version
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
