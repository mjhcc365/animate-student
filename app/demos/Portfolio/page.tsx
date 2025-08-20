"use client";

import { Canvas } from "@react-three/fiber";
import {
  Text,
  Html,
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";
import "./index.css";

const Experience = () => {
  const { scene } = useGLTF("/model.gltf");

  return (
    <>
      <ambientLight intensity={3} />
      <Environment preset="sunset" />
      <color args={["#241a1a"]} attach="background" />
      <PresentationControls
        global
        // 初始旋转角度 [x轴, y轴, z轴]
        rotation={[0.13, 0.1, 0]}
        // 极角范围 [最小值, 最大值] - 控制垂直旋转限制
        polar={[-0.4, 0.2]}
        // 方位角范围 [最小值, 最大值] - 控制水平旋转限制
        azimuth={[-0.1, 0.75]}
        // 阻尼系数 - 控制动画的平滑程度，值越小越平滑
        damping={0.1}
        // 物理配置：质量(影响惯性)和张力(影响弹性)
        config={{ mass: 2, tension: 400 }}
        // 启用鼠标光标跟随
        cursor={true}
        // 启用吸附效果 - 松手后自动对齐到网格
        snap={true}
        // 启用控制器功能
        enabled={true}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={scene} scale={1.25}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
          <Text
            fontSize={1}
            position={[2, 0.75, 0.75]}
            rotation-y={-1.25}
            maxWidth={2}
          >
            BRUNO SIMON
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows
        position-y={-1.4}
        opacity={0.45}
        scale={5}
        blur={2.4}
        far={6}
      />
    </>
  );
};

function Portfolio() {
  return (
    <Canvas
      className="r3f"
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Experience />
    </Canvas>
  );
}

export default Portfolio;
