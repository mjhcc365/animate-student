"use client";
import * as THREE from "three";
import { useRef } from "react";
// @ts-ignore
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  Sparkles,
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  shaderMaterial,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

import "./page.css";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

const SceneDemo = () => {
  const { nodes } = useGLTF("/model/portal.glb");
  const texture = useTexture("/model/baked.jpg");
  const portalMaterialRef = useRef<THREE.ShaderMaterial>(null);

  texture.flipY = false;
  console.log(nodes);

  // @ts-ignore
  useFrame((state: any) => {
    if (portalMaterialRef.current) {
      portalMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <Center>
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh
        geometry={nodes.poleLightB.geometry}
        position={nodes.poleLightB.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>
      <mesh
        geometry={nodes.poleLightA.geometry}
        position={nodes.poleLightA.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>
      <mesh
        geometry={nodes.portalLight.geometry}
        position={nodes.portalLight.position}
        rotation={nodes.portalLight.rotation}
      >
        {/* @ts-ignore */}
        <portalMaterial ref={portalMaterialRef} />
      </mesh>
      <Sparkles
        size={3}
        scale={[4, 2, 4]}
        position-y={1}
        speed={0.2}
        count={80}
      />
    </Center>
  );
};

const PortalScene = () => {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <color args={["#030202"]} attach="background" />
      <SceneDemo />
    </Canvas>
  );
};

export default PortalScene;
