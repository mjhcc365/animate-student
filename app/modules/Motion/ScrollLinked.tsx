"use client";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
// import { useState } from "react";

export default function ScrollLinked() {
  const { scrollYProgress, scrollY } = useScroll();
  // const [scrollDirection, setScrollDirection] = useState("down");
  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - scrollY.getPrevious();
    // 可以用于判断向🔼 还是向🔽 滑
    console.log("===>current", diff);
  });

  // 更加丝滑
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 转换为别的值
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#f00", "#0f0", "#00f"]
  );

  // 转换为别的值

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: backgroundColor,
          // backgroundColor: "#ff0088",
        }}
      />
      <Content />
    </>
  );
}

function Content() {
  return (
    <>
      <article style={{ maxWidth: 500, padding: "150px 20px" }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
        </p>
        <p>
          Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
          imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
          Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
          blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
          ipsum tellus, eu tincidunt neque tincidunt a.
        </p>
        <h2>Sub-header</h2>
        <p>
          In eget sodales arcu, consectetur efficitur metus. Duis efficitur
          tincidunt odio, sit amet laoreet massa fringilla eu.
        </p>
        <p>
          Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
          Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
          Proin sit amet lacus mollis, semper massa ut, rutrum mi.
        </p>
        <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
        <p>
          Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
          leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
        </p>
        <h2>Sub-header</h2>
        <p>
          Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
          aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
          sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
          metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
          enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
          pretium.
        </p>
        <p>
          Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
          elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
          ultricies, mollis mi in, euismod dolor.
        </p>
        <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
        <p>
          Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
          Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
          Proin sit amet lacus mollis, semper massa ut, rutrum mi.
        </p>
        <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
        <p>
          Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
          leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
        </p>
        <h2>Sub-header</h2>
        <p>
          Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
          aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
          sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
          metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
          enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
          pretium.
        </p>
        <p>
          Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
          elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
          ultricies, mollis mi in, euismod dolor.
        </p>
        <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac
          rhoncus quam.
        </p>
        <p>
          Fringilla quam urna. Cras turpis elit, euismod eget ligula quis,
          imperdiet sagittis justo. In viverra fermentum ex ac vestibulum.
          Aliquam eleifend nunc a luctus porta. Mauris laoreet augue ut felis
          blandit, at iaculis odio ultrices. Nulla facilisi. Vestibulum cursus
          ipsum tellus, eu tincidunt neque tincidunt a.
        </p>
        <h2>Sub-header</h2>
        <p>
          In eget sodales arcu, consectetur efficitur metus. Duis efficitur
          tincidunt odio, sit amet laoreet massa fringilla eu.
        </p>
        <p>
          Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
          Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
          Proin sit amet lacus mollis, semper massa ut, rutrum mi.
        </p>
        <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
        <p>
          Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
          leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
        </p>
        <h2>Sub-header</h2>
        <p>
          Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
          aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
          sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
          metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
          enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
          pretium.
        </p>
        <p>
          Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
          elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
          ultricies, mollis mi in, euismod dolor.
        </p>
        <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
        <p>
          Pellentesque id lacus pulvinar elit pulvinar pretium ac non urna.
          Mauris id mauris vel arcu commodo venenatis. Aliquam eu risus arcu.
          Proin sit amet lacus mollis, semper massa ut, rutrum mi.
        </p>
        <p>Sed sem nisi, luctus consequat ligula in, congue sodales nisl.</p>
        <p>
          Vestibulum bibendum at erat sit amet pulvinar. Pellentesque pharetra
          leo vitae tristique rutrum. Donec ut volutpat ante, ut suscipit leo.
        </p>
        <h2>Sub-header</h2>
        <p>
          Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla
          aliquet. Pellentesque auctor vehicula malesuada. Aliquam id feugiat
          sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula
          metus ac, interdum nibh. Curabitur vitae convallis ligula. Integer ac
          enim vel felis pharetra laoreet. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Pellentesque hendrerit ac augue quis
          pretium.
        </p>
        <p>
          Morbi ut scelerisque nibh. Integer auctor, massa non dictum tristique,
          elit metus efficitur elit, ac pretium sapien nisl nec ante. In et ex
          ultricies, mollis mi in, euismod dolor.
        </p>
        <p>Quisque convallis ligula non magna efficitur tincidunt.</p>
      </article>
    </>
  );
}
