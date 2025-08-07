"use client";

import * as THREE from "three";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import "./page.css";

const verticesCount = 50;

// extend({ OrbitControls });

const Cube = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.BufferGeometry>(null!);

  const { camera, gl } = useThree();

  // console.log("===>three", three);

  // 每帧旋转立方体
  // useFrame((state, delta) => {
  //   // ref.current.rotation.y += delta * 0.5;
  // });

  // const positions = useMemo(() => {
  //   const positions = new Float32Array(verticesCount * 3);

  //   for (let i = 0; i < verticesCount * 3; i++)
  //     positions[i] = (Math.random() - 0.5) * 3;

  //   return positions;
  // }, []);

  // useEffect(() => {
  //   geometryRef.current.computeVertexNormals();
  // }, [positions]);

  return (
    <>
      {/* @ts-ignore */}
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <OrbitControls />
      <TransformControls position={[-2, 0, 0]} mode="translate">
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </TransformControls>
    </>
  );
};

const ThreeDemos = () => {
  const ref = useRef<THREE.Mesh>(null!);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 3, 6] }}
    >
      <Perf position="top-left" />
      {/* <ambientLight intensity={1.5} /> */}
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      {/* <pointLight position={[10, 10, 0]} /> */}
      <Cube />
      {/* <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <sphereGeometry />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh> */}
      <PivotControls
        anchor={[0, 0, 0]}
        lineWidth={4}
        depthTest={false}
        scale={100}
        fixed
      >
        <mesh position={[2, 0, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </PivotControls>

      <Html position={[1, 1, 0]} wrapperClass="label" center distanceFactor={8}>
        That's a sphere 👍
      </Html>
      <mesh position={[0, -2, -3]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <MeshReflectorMaterial mixBlur={1} mirror={0.5} color="blue" />
        {/* <meshBasicMaterial color="blue" side={THREE.DoubleSide} /> */}
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          color="salmon"
          fontSize={0.5}
          position={[0, 0, 0]}
          textAlign="center"
        >
          222222222
        </Text>
      </Float>
    </Canvas>
  );
};

export default ThreeDemos;
