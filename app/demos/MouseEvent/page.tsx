"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Bvh,
  meshBounds,
  OrbitControls,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import { useRef, useState } from "react";

import "./index.css";

const Experience = () => {
  const cube = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const model = useGLTF("/hamburger.glb");

  // 优化后的useCursor用法
  useCursor(hovered);

  // @ts-ignore
  const eventHandler = (event: THREE.Event) => {
    // console.log("---");
    // // @ts-ignore
    // console.log("distance", event.distance); // Distance between camera and hit point
    // // @ts-ignore
    // console.log("point", event.point); // Hit point coordinates (in 3D)
    // // @ts-ignore
    // console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
    // // @ts-ignore
    // console.log("object", event.object); // The object that triggered the event
    // // @ts-ignore
    // console.log("eventObject", event.eventObject); // The object that was listening to the event (useful where there is objects in objects)

    // console.log("---");
    // // @ts-ignore
    // console.log("x", event.x); // 2D screen coordinates of the pointer
    // // @ts-ignore
    // console.log("y", event.y); // 2D screen coordinates of the pointer

    // console.log("---");
    // // @ts-ignore
    // console.log("shiftKey", event.shiftKey); // If the SHIFT key was pressed
    // // @ts-ignore
    // console.log("ctrlKey", event.ctrlKey); // If the CTRL key was pressed
    // // @ts-ignore
    // console.log("metaKey", event.metaKey); // If the COMMAND key was pressed

    cube.current?.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <primitive
        scale={0.2}
        object={model.scene}
        onClick={(e) => {
          console.log("==>", e);
          e.stopPropagation();
        }}
      />
      <mesh
        ref={cube}
        raycast={meshBounds}
        scale={1.5}
        position={[2, 0, 0]}
        onClick={eventHandler}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh
        position={[-2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh scale={10} position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="yellowgreen" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const MouseEvent = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Bvh>
        <Experience />
      </Bvh>
    </Canvas>
  );
};

export default MouseEvent;
