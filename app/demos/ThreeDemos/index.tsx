"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

const Cube = () => {
  const ref = useRef<THREE.Mesh>(null!);

  // 每帧旋转立方体
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const ThreeDemos = () => {
  const ref = useRef<THREE.Mesh>(null!);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
};

export default ThreeDemos;
