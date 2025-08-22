import * as THREE from "three";
import { useRef, useState } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, KeyboardControls } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

// 公共scale参数
const FLOOR_SCALE: [number, number, number] = [4, 0.2, 4];
const SPINNER_OBSTACLE_SCALE: [number, number, number] = [3.5, 0.3, 0.3];
const LIMBO_OBSTACLE_SCALE: [number, number, number] = [3.5, 0.3, 0.3];
const AXE_OBSTACLE_SCALE: [number, number, number] = [1.5, 1.5, 0.3];
const WALL_SCALE: [number, number, number] = [0.2, 2, 2];
const HAMBURGER_SCALE = 0.1;

// 开始结束
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
// 陷阱
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
// 障碍物
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
// 墙
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position as any}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        scale={FLOOR_SCALE}
        receiveShadow
      ></mesh>
    </group>
  );
};
const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<any>(null);

  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1)
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, time * speed, 0)
    );
    obstacle.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position as any}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={FLOOR_SCALE}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition">
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={SPINNER_OBSTACLE_SCALE}
          position={[0, 0.3, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<any>(null);

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.15;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position as any}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={FLOOR_SCALE}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition">
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={LIMBO_OBSTACLE_SCALE}
          position={[0, 0.3, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef<any>(null);

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time + timeOffset) * 1.25;
    obstacle.current.setNextKinematicTranslation({
      x: x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position as any}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={FLOOR_SCALE}
        receiveShadow
      />
      <RigidBody ref={obstacle} type="kinematicPosition">
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={AXE_OBSTACLE_SCALE}
          position={[0, 0.3, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

function BlockEnd({ position = [0, 0, 0] }) {
  const model = useGLTF("/hamburger.glb");

  model.scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  return (
    <group position={position as any}>
      <RigidBody
        type="fixed"
        restitution={0.2} // 弹性
        friction={0} // 摩擦力
        position={[0, 0.25, 0]}
      >
        <primitive object={model.scene} scale={HAMBURGER_SCALE} />
      </RigidBody>
      <mesh
        receiveShadow
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={FLOOR_SCALE}
      />
    </group>
  );
}

// 随机选择组件的函数
const getRandomBlock = () => {
  const blocks = [BlockSpinner, BlockLimbo, BlockAxe];
  const randomIndex = Math.floor(Math.random() * blocks.length);
  return blocks[randomIndex];
};

const Bounds = ({ length = 5 }: { length: number }) => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        castShadow
        geometry={boxGeometry}
        material={wallMaterial}
        position={[2.1, 0.75, -(length * 2) + 2]} // 计算墙的位置
        scale={[0.2, 1.5, 4 * length]} // 计算墙的缩放
      />
      <mesh
        castShadow
        geometry={boxGeometry}
        material={wallMaterial}
        position={[-2.1, 0.75, -(length * 2) + 2]} // 计算墙的位置
        scale={[0.2, 1.5, 4 * length]} // 计算墙的缩放
      />
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        position={[0, 0.75, -(length * 4) + 2]}
        scale={[4, 1.5, 0.3]}
        castShadow
      />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
};

const Level = ({ count = 5 }: { count: number }) => {
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {Array.from({ length: count }).map((_, index) => {
        const RandomBlock = getRandomBlock();
        return (
          <RandomBlock key={index} position={[0, 0, -(4 * (index + 1))]} />
        );
      })}
      <BlockEnd position={[0, 0, -(4 * (count + 1))]} />
      <Bounds length={count + 2} />
    </>
  );
};

export default Level;
