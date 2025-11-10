"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import galaxyVertexShader from "./shaders/vertex.glsl";
import galaxyFragmentShader from "./shaders/fragment.glsl";

let dat: any = null;
if (typeof window !== "undefined") {
  dat = require("dat.gui");
}

export default function GalaxyShaderDemo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const guiRef = useRef<dat.GUI | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 获取容器尺寸
    const container = mountRef.current;
    const { clientWidth, clientHeight } = container;

    // 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 相机
    const camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      0.1,
      100
    );
    camera.position.set(3, 3, 3);
    scene.add(camera);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    // 避免在少数超高分辨率设备上过渡消耗性能
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // GUI控制器 - only create if dat is available
    let gui: any = null;
    if (dat) {
      gui = new dat.GUI();
      guiRef.current = gui;
    }

    // Galaxy参数
    const parameters = {
      count: 200000,
      size: 0.005,
      radius: 5,
      branches: 3,
      spin: 1,
      randomness: 0.5,
      randomnessPower: 3,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    };

    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;

    // 生成Galaxy的函数
    const generateGalaxy = () => {
      // 清理之前的几何体和材质
      if (points !== null) {
        geometry?.dispose();
        material?.dispose();
        scene.remove(points);
      }

      // 创建几何体
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);
      const scales = new Float32Array(parameters.count * 1);

      const insideColor = new THREE.Color(parameters.insideColor);
      const outsideColor = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        // 位置计算
        const radius = Math.random() * parameters.radius;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
        const spinAngle = radius * parameters.spin;

        // 随机偏移
        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;

        // 设置位置，添加旋转变换
        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // 颜色混合
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;

        // Scale
        scales[i] = Math.random();
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

      // 创建材质
      material = new THREE.ShaderMaterial({
        uniforms: {
          /** 目标是在devicePixelRatio为1或2的设备上，视觉效果一致 */
          uSize: { value: 8 * renderer.getPixelRatio() },
        },
        vertexShader: galaxyVertexShader,
        fragmentShader: galaxyFragmentShader,
      });

      // 创建点云
      points = new THREE.Points(geometry, material as any);
      scene.add(points);
    };

    // 初始化生成Galaxy
    generateGalaxy();

    // 添加GUI控制器 - only if gui is available
    if (gui) {
      gui
        .add(parameters, "count")
        .min(100)
        .max(1000000)
        .step(100)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "radius")
        .min(0.01)
        .max(20)
        .step(0.01)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "branches")
        .min(2)
        .max(20)
        .step(1)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "spin")
        .min(-5)
        .max(5)
        .step(0.01)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "randomness")
        .min(0)
        .max(2)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui
        .add(parameters, "randomnessPower")
        .min(1)
        .max(10)
        .step(0.001)
        .onFinishChange(generateGalaxy);
      gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
      gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);
    }

    // 动画循环
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (material) {
        material.uniforms.uTime = { value: elapsedTime };
      }

      // 更新控制器
      controls.update();

      // 渲染
      renderer.render(scene, camera);

      // 继续下一帧
      requestAnimationFrame(tick);
    };

    tick();

    // 窗口大小调整
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      // Safely destroy gui if it exists
      if (guiRef.current && typeof guiRef.current.destroy === "function") {
        guiRef.current.destroy();
      }
      geometry?.dispose();
      material?.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} className="galaxy-container" />
      <style jsx>{`
        .galaxy-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        /* 媒体查询：移动端 */
        @media (max-width: 768px) {
          .galaxy-container {
            width: 100vw;
            height: 80vh;
          }
        }

        /* 媒体查询：平板设备 */
        @media (min-width: 769px) and (max-width: 1024px) {
          .galaxy-container {
            width: 100vw;
            height: 90vh;
          }
        }

        /* 媒体查询：桌面设备 */
        @media (min-width: 1025px) {
          .galaxy-container {
            width: 100vw;
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
}
