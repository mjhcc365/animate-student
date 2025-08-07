"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  SoftShadows,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
  Sky,
  Environment,
  Lightformer,
  Stage,
  useGLTF,
  Clone,
  useAnimations,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useRef, useEffect, useMemo, Suspense, useState } from "react";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
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

/** SKY && SHADOWS */
const SkyDemo = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // 使用Leva控制Sky太阳位置
  const sunPosition = useControls("Sun Position", {
    x: { value: 1, min: -10, max: 10, step: 0.1 },
    y: { value: 2, min: -10, max: 10, step: 0.1 },
    z: { value: 3, min: -10, max: 10, step: 0.1 },
  });

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* 如果场景是静态的，使用它可以显著提升性能 */}
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />
      <OrbitControls />
      <ambientLight intensity={2.5} />
      <directionalLight
        castShadow
        ref={directionalLightRef}
        position={[sunPosition.x, sunPosition.y, sunPosition.z]}
        intensity={2.5}
      />
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={4.5}
          position={[1, 2, 3]}
          bias={0.001}
          // position={[1, 2, 3]}
        />
        <directionalLight
          castShadow
          ref={directionalLightRef}
          position={[1, 2, 3]}
          intensity={4.5}
          // shadow-mapSize={[1024, 1024]}
          // // shadow-mapSize={[1024, 1024]}
          // shadow-camera-near={1}
          // shadow-camera-far={10}
          // shadow-camera-top={5}
          // shadow-camera-right={5}
          // shadow-camera-bottom={-5}
          // shadow-camera-left={-5}
        />
      </AccumulativeShadows> */}

      <color args={["ivory"]} attach="background" />
      <mesh castShadow position={[2, 0, 0]} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh castShadow position={[-2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh
        receiveShadow
        position={[0, -1, 0]}
        scale={10}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

// const
// 环境贴图
const EnvironmentDemo = () => {
  const { envMapIntensity } = useControls("environment map", {
    envMapIntensity: { value: 1, min: 0, max: 12 },
  });
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // 使用Leva控制Sky太阳位置
  const sunPosition = useControls("Sun Position", {
    x: { value: 1, min: -10, max: 10, step: 0.1 },
    y: { value: 2, min: -10, max: 10, step: 0.1 },
    z: { value: 3, min: -10, max: 10, step: 0.1 },
  });
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);

  return (
    <>
      <Sky sunPosition={[sunPosition.x, sunPosition.y, sunPosition.z]} />
      <Environment
        background
        // files={[
        //   "/environmentMaps/2/px.jpg",
        //   "/environmentMaps/2/nx.jpg",
        //   "/environmentMaps/2/py.jpg",
        //   "/environmentMaps/2/ny.jpg",
        //   "/environmentMaps/2/pz.jpg",
        //   "/environmentMaps/2/nz.jpg",
        // ]}
        preset="sunset"
        resolution={32} // 分辨率
        ground={{
          height: 7,
          radius: 28,
          scale: 100,
        }}
        // files="/environmentMaps/the_sky_is_on_fire_2k.hdr"
      >
        {/* <color args={["#000000"]} attach="background" /> */}
        {/* <mesh position-z={-3} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
        {/* <Lightformer
          position-z={-5}
          scale={5}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      </Environment>
      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={"#316d39"}
        opacity={0.8}
        blur={1}
      />
      <OrbitControls />
      <directionalLight
        castShadow
        position={[sunPosition.x, sunPosition.y, sunPosition.z]}
        intensity={2.5}
      />
      <mesh castShadow position={[2, 0, 0]} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh castShadow position={[-2, 0, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <mesh
        receiveShadow
        position={[0, -1, 0]}
        scale={10}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} />
      </mesh> */}
    </>
  );
};

const StageDemo = () => {
  return (
    <>
      <OrbitControls />
      <Stage
        shadows={{ type: "contact", opacity: 0.2, blur: 3 }}
        environment="sunset"
        preset="portrait"
        adjustCamera={false}
        // environment="sunset"
      >
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
};

const Placeholder = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
};

const ModelDemo = () => {
  // const model = useLoader(
  //   GLTFLoader,
  //   "/FlightHelmet/glTF/FlightHelmet.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("./draco/");
  //     loader.setDRACOLoader(dracoLoader);
  //   }
  // );
  const model = useGLTF("/hamburger-draco.glb");
  return (
    <>
      <Clone object={model.scene} scale={0.3} position={[0, -1, 0]} />;
      <Clone object={model.scene} scale={0.3} position={[3, -1, 0]} />;
      <Clone object={model.scene} scale={0.3} position={[-3, -1, 0]} />;
      {/* <primitive object={model.scene} scale={0.3} position={[0, -1, 0]} />; */}
    </>
  );
};

const FoxDemo = () => {
  const fox = useGLTF("/Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);
  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    if (!animations.actions || !animationName) return;
    const action = animations.actions[animationName];
    // 播放选中的动画
    action?.reset().fadeIn(0.5).play();
    // 清理函数：组件卸载时停止动画
    return () => {
      action?.stop();
    };
  }, [animationName, animations.actions]);

  return <primitive object={fox.scene} scale={0.05} position={[0, -2, 0]} />;
};

// useGLTF.preload("/hamburger-draco.glb");
const LoadModals = () => {
  // const modal = useLoader(GLTFLoader, "/hamburger.glb");
  // const dracoModal = useLoader(GLTFLoader, "/hamburger-draco.glb", (loader) => {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath("/draco/");
  //   dracoLoader.preload();
  //   loader.setDRACOLoader(dracoLoader);
  // });

  // console.log("===>gltf", dracoModal);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      {/* <Suspense fallback={<Placeholder />}>
        <ModelDemo />
      </Suspense> */}
      <Suspense fallback={<Placeholder />}>
        <FoxDemo />
      </Suspense>
      <mesh position={[0, -2, 0]} scale={10} rotation-x={-Math.PI / 2}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const Text3DDemo = () => {
  const [matcap] = useMatcapTexture("7877EE_D87FC5_75D9C7_1C78C0", 256);

  const [torusGeometry, setTorusGeometry] = useState();

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* <ambientLight intensity={0.5} /> */}
      {/* <directionalLight position={[10, 10, 5]} intensity={1} /> */}
      <Text3D font="/fonts/helvetiker_regular.typeface.json">
        Hello World
        <meshMatcapMaterial matcap={matcap} />
      </Text3D>
      {/* <mesh>
        <torusGeometry />
        <meshMatcapMaterial matcap={matcap} />
      </mesh> */}

      <torusGeometry ref={setTorusGeometry} />
      {new Array(100).fill(0).map((_, i) => (
        <mesh
          key={i}
          geometry={torusGeometry}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.5}
          rotation={[
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
            0,
          ]}
        >
          {/* <torusGeometry /> */}
          <meshMatcapMaterial matcap={matcap} />
        </mesh>
      ))}
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
      // dpr={[1, 2]}
      // gl={{ antialias: true }}
      shadows
      camera={{ position: [0, 3, 6] }}
    >
      {/*   <EnvironmentDemo /> */}
      {/* <StageDemo /> */}
      {/* <SkyDemo /> */}
      {/* <LoadModals /> */}
      <Text3DDemo />
    </Canvas>
  );
};

export default ThreeDemos;
