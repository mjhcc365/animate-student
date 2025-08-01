"use client";

export default function ResponsiveExample() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* 响应式容器 */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8">
          响应式设计最佳实践
        </h1>

        {/* 响应式网格布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* 卡片组件 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-slate-800 rounded-lg p-4 md:p-6 hover:bg-slate-700 transition-colors"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                卡片 {item}
              </h3>
              <p className="text-sm md:text-base text-slate-400">
                这是一个响应式卡片，在不同屏幕尺寸下会显示不同的样式。
              </p>
            </div>
          ))}
        </div>

        {/* 响应式文本 */}
        <div className="mt-12 space-y-6">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
              响应式文本示例
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-slate-400 max-w-4xl mx-auto">
              这段文本会根据屏幕尺寸调整大小。在移动设备上较小，在桌面设备上较大，
              确保在所有设备上都有良好的可读性。
            </p>
          </div>
        </div>

        {/* 响应式间距 */}
        <div className="mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 lg:mb-8">
            响应式间距
          </h2>
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-lg">
              <p className="text-sm md:text-base">
                这个容器的内边距会根据屏幕尺寸变化
              </p>
            </div>
          </div>
        </div>

        {/* 响应式导航 */}
        <nav className="mt-8 md:mt-12 bg-slate-800 rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">导航菜单</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                首页
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                关于
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                联系
              </button>
            </div>
          </div>
        </nav>

        {/* 响应式图片 */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            响应式图片
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center"
              >
                <span className="text-slate-400">图片 {item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 响应式表格 */}
        <div className="mt-8 md:mt-12 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            响应式表格
          </h2>
          <table className="w-full bg-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm md:text-base">
                  名称
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-base hidden md:table-cell">
                  描述
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-base hidden lg:table-cell">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-base">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-700">
                <td className="px-4 py-3 text-sm md:text-base">项目 A</td>
                <td className="px-4 py-3 text-sm md:text-base hidden md:table-cell">
                  这是一个示例项目
                </td>
                <td className="px-4 py-3 text-sm md:text-base hidden lg:table-cell">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                    活跃
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    编辑
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
