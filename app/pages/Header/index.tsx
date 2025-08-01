import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex w-full  h-auto py-4 gap-4">
          <div className="flex w-full justify-between items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Animate Student Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xs text-stone-400 bg-stone-800 px-2 py-1 rounded-full">
              网站特效案例库
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
