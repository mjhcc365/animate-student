"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";

import Level from "./Level";
import Lights from "./Lights";

import "./index.css";

const Page = () => {
  return (
    <Canvas shadows>
      <color attach="background" args={["#FFFFF1"]} />
      {/* makeDefault 确保只有一个控制器处于活动状态 */}
      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <Physics>
        <Lights />
        <Level count={5} />
      </Physics>
    </Canvas>
  );
};

export default Page;
