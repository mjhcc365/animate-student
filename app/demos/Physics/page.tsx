"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  RoundCuboidCollider,
} from "@react-three/rapier";
import { Perf } from "r3f-perf";

import "./index.css";

const Experience = () => {
  return (
    <Physics debug>
      {/* <RigidBody
        //   colliders="hull"
        colliders="trimesh" // 避免在运动的物体中使用，防止bug
      >
        <mesh castShadow position={[0, 1, 0]} rotation={[Math.PI * 0.1, 0, 0]}>
          <torusGeometry args={[1, 0.5, 16, 32]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody> */}

      <RigidBody
        colliders={false}
        position={[0, 1, 0]}
        scale={0.8}
        rotation={[Math.PI * 0.1, 0, 0]}
      >
        <RoundCuboidCollider args={[1, 1, 1, 1]} />
        <mesh castShadow>
          <torusGeometry args={[1, 0.5, 16, 32]} />
          <meshStandardMaterial color="blueviolet" />
        </mesh>
      </RigidBody>
      {/* <RigidBody>
        <mesh castShadow position={[2, 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody> */}

      <RigidBody colliders="ball">
        <mesh castShadow position={[-2, 2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh receiveShadow position-y={-1.25}>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

const page = () => {
  return (
    <Canvas>
      <Perf position="top-left" />
      <ambientLight intensity={3} />
      <Experience />
    </Canvas>
  );
};

export default page;
