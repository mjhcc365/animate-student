"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import "./index.css";

const Experience = () => {
  const { scene } = useGLTF("/model.gltf");

  return (
    <>
      <ambientLight intensity={3} />
      <Environment preset="sunset" />
      <color args={["#241a1a"]} attach="background" />
      <PresentationControls global>
        <Float rotationIntensity={0.4}>
          <primitive object={scene} position-y={-1.2} />
        </Float>
      </PresentationControls>
    </>
  );
};

function Portfolio() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}

export default Portfolio;
