const Header = () => {
  return (
    <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col justify-between items-start h-auto py-4 gap-4">
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-xl font-bold ">Animate Student</h1>
            <span className="text-xs text-stone-400 bg-stone-800 px-2 py-1 rounded-full self-start">
              网站特效案例库
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-stone-400 text-center">
              收集和展示现代网站动画效果
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
