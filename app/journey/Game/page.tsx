"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";

import Level from "./Level";
import Lights from "./Lights";
import Player from "./Player";
import Interface from "./Interface";

import "./index.css";

const Page = () => {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <color args={["#bdedfc"]} attach="background" />
        {/* makeDefault 确保只有一个控制器处于活动状态 */}
        {/* <OrbitControls makeDefault /> */}
        <Perf position="top-left" />
        <Physics debug>
          <Lights />
          <Level count={5} />
          <Player />
        </Physics>
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
};

export default Page;
