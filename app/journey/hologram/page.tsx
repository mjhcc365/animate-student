"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

export default function ThreeBasicDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 场景
    const scene = new THREE.Scene();
    // 相机
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 5;
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);

    /** 球 */
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const diyMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const ball = new THREE.Mesh(geometry, diyMaterial);

    ball.position.x = 1;
    scene.add(ball);

    /** susan */
    const susanGeometry = new THREE.PlaneGeometry(3, 3);
    const susanMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    });
    const susan = new THREE.Mesh(susanGeometry, susanMaterial);
    susan.position.x = -1;
    scene.add(susan);

    /** torusKnot */
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
      diyMaterial
    );
    torusKnot.position.x = 3;
    scene.add(torusKnot);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果
    controls.dampingFactor = 0.05; // 阻尼系数
    controls.enableZoom = true; // 启用缩放
    controls.enablePan = true; // 启用平移
    controls.enableRotate = true; // 启用旋转
    controls.autoRotate = false; // 自动旋转（可选）
    controls.autoRotateSpeed = 2.0; // 自动旋转速度

    // 挂载到 DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 动画
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      // 更新轨道控制器
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();
    // 清理
    return () => {
      cancelAnimationFrame(frameId);
      controls.dispose(); // 销毁轨道控制器
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
}
