"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

export default function ShaderDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 场景
    const scene = new THREE.Scene();
    // 相机
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 5;
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);

    // 使用自定义 shader 的材质
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    // 立方体
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 挂载到 DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 动画
    let frameId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // 清理
    return () => {
      cancelAnimationFrame(frameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
}
