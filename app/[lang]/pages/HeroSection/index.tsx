interface HeroSectionProps {
  dict: any;
}

const HeroSection = ({ dict }: HeroSectionProps) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold text-white mb-3">
        {dict?.hero?.title || "动画效果资源库"}
      </h2>
      <p className="text-base text-stone-400 max-w-3xl mx-auto px-4">
        {dict?.hero?.description ||
          "这里收集了各种现代网站动画效果，包括CSS动画、Three.js 3D效果、着色器等。每个演示都包含完整的代码和说明。"}
      </p>
    </div>
  );
};

export default HeroSection;
