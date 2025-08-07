"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  useHelper,
} from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import "./page.css";

const verticesCount = 50;

const Cube = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.BufferGeometry>(null!);

  const { camera, gl } = useThree();

  // console.log("===>three", three);

  // 每帧旋转立方体
  // useFrame((state, delta) => {
  //   // ref.current.rotation.y += delta * 0.5;
  // });

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3;

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, [positions]);

  return (
    <>
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

const DemoBaisc = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 3, 6] }}
    >
      <Perf position="top-left" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <pointLight position={[10, 10, 0]} />
      <Cube />
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[4, 0, 0]}>
        <sphereGeometry />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
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

const Environment = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <directionalLight
        ref={directionalLightRef}
        position={[1, 1, 3]}
        intensity={4.5}
      />
      <color args={["ivory"]} attach="background" />
      <mesh position={[2, 0, 0]} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[0, -1, 0]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const ThreeDemos = () => {
  const ref = useRef<THREE.Mesh>(null!);

  // useEffect(() => {
  //   directionalLightRef.current.position.set(1, 2, 3);
  // }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [0, 3, 6] }}
    >
      <Environment />
    </Canvas>
  );
};

export default ThreeDemos;
