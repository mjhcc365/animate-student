const VWLAB = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-tight">
              WATSON
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We create digital experiences that matter
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                About Watson
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We are a creative studio focused on digital innovation and
                meaningful experiences. Our team combines strategic thinking
                with cutting-edge technology to deliver solutions that connect
                with people.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From concept to execution, we craft digital experiences that
                inspire, engage, and drive results for forward-thinking brands.
              </p>
            </div>
            <div className="bg-gray-900 h-96 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-light mb-4">Design</h3>
              <p className="text-gray-300 leading-relaxed">
                Creative design solutions that capture your brand's essence and
                connect with your audience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-light mb-4">Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Cutting-edge web development using the latest technologies and
                best practices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-black text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-light mb-4">Strategy</h3>
              <p className="text-gray-300 leading-relaxed">
                Strategic digital solutions that drive growth and achieve your
                business objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
            Selected Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="bg-gray-900 h-80 rounded-lg mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>
              <h3 className="text-2xl font-light mb-2">Project One</h3>
              <p className="text-gray-300">Digital Experience Design</p>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-900 h-80 rounded-lg mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>
              <h3 className="text-2xl font-light mb-2">Project Two</h3>
              <p className="text-gray-300">Brand Identity</p>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-900 h-80 rounded-lg mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>
              <h3 className="text-2xl font-light mb-2">Project Three</h3>
              <p className="text-gray-300">Web Development</p>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-gray-900 h-80 rounded-lg mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
              </div>
              <h3 className="text-2xl font-light mb-2">Project Four</h3>
              <p className="text-gray-300">Digital Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to create something amazing? Get in touch and let's discuss
            your next project.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:hello@watson.la"
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="#work"
              className="border border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-light">WATSON</h3>
              <p className="text-gray-400 mt-2">
                Creating digital experiences that matter
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">© 2024 Watson. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VWLAB;
