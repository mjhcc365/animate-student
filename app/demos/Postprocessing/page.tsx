"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./page.css";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <mesh position={[-2, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0, -1, 0]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="yellowgreen" />
      </mesh>
    </>
  );
};
const Postprocessing = () => {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
  return <div>Postprocessing</div>;
};

export default Postprocessing;
