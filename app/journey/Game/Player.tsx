import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRapier } from "@react-three/rapier";

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  console.log(rapier);

  const body = useRef<any>(null);
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } = getKeys();

    const impulse = new THREE.Vector3();
    const torque = new THREE.Vector3();

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current?.applyImpulse(impulse, true);
    body.current?.applyTorqueImpulse(torque, true);

    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 0.1);
    smoothedCameraTarget.lerp(cameraTarget, 0.1);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });

  const jump = () => {
    // 获取当前位置 即 跳跃前的起始位置
    const origin = body.current.translation();
    // 跳跃前 将位置向下移动 0.31
    origin.y -= 0.31;
    // 跳跃方向
    const direction = { x: 0, y: -1, z: 0 };
    // 创建射线
    const ray = new rapier.Ray(origin, direction);
    // 发射射线 检测是否碰撞到地面
    const hit = world.castRay(ray, 10, true);
    // 如果碰撞到地面 则跳跃
    if (hit.timeOfImpact < 0.15) {
      // 跳跃力度
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    return () => {
      unsubscribeJump();
    };
  }, []);

  return (
    <>
      <RigidBody
        ref={body}
        canSleep={false} // 能否进入休眠模式
        colliders="ball"
        position={[0, 1, 0]}
        restitution={0.2} // 弹性
        friction={1} // 摩擦力
        linearDamping={0.5} // 线性阻尼
        angularDamping={0.5} // 角阻尼
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
