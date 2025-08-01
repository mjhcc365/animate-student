"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";

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

    // 立方体
    const planeGeometry = new THREE.PlaneGeometry(10, 5, 512, 512);
    // 创建新的材质
    let debugObject: any = {};
    debugObject.depthColor = "#186691";
    debugObject.surfaceColor = "#9bd8ff";

    const material = new THREE.RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uTime: { value: 0 },
        uBigWavesSpeed: { value: 0.75 },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.25 },
        uColorMultiplier: { value: 2 },
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallIterations: { value: 4 },
      },
    });
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.rotateX(-Math.PI / 2);
    scene.add(plane);

    // 创建GUI
    const gui = new dat.GUI();
    gui
      .add(material.uniforms.uBigWavesElevation, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uBigWavesElevation");
    gui
      .add(material.uniforms.uBigWavesSpeed, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uBigWavesSpeed");

    // 添加uBigWavesFrequency的GUI控制
    const bigWavesFrequencyFolder = gui.addFolder("uBigWavesFrequency");
    bigWavesFrequencyFolder
      .add(material.uniforms.uBigWavesFrequency.value, "x")
      .min(0)
      .max(10)
      .step(0.1)
      .name("X");
    bigWavesFrequencyFolder
      .add(material.uniforms.uBigWavesFrequency.value, "y")
      .min(0)
      .max(10)
      .step(0.1)
      .name("Y");
    bigWavesFrequencyFolder.open();
    gui.addColor(debugObject, "depthColor").onChange(() => {
      material.uniforms.uDepthColor.value.set(debugObject.depthColor);
    });
    gui.addColor(debugObject, "surfaceColor").onChange(() => {
      material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
    });
    gui
      .add(material.uniforms.uColorOffset, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uColorOffset");
    gui
      .add(material.uniforms.uColorMultiplier, "value")
      .min(0)
      .max(10)
      .step(0.001)
      .name("uColorMultiplier");
    gui
      .add(material.uniforms.uSmallWavesElevation, "value")
      .min(0)
      .max(1)
      .step(0.001)
      .name("uSmallWavesElevation");
    gui
      .add(material.uniforms.uSmallWavesFrequency, "value")
      .min(0)
      .max(30)
      .step(0.001)
      .name("uSmallWavesFrequency");
    gui
      .add(material.uniforms.uSmallWavesSpeed, "value")
      .min(0)
      .max(4)
      .step(0.001)
      .name("uSmallWavesSpeed");
    gui
      .add(material.uniforms.uSmallIterations, "value")
      .min(0)
      .max(5)
      .step(1)
      .name("uSmallIterations");

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false; // 禁用平移以提高性能

    // 挂载到 DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 动画
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      // Water
      material.uniforms.uTime.value = elapsedTime;

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
      gui.destroy(); // 清理GUI
    };
  }, []);

  return <div ref={mountRef} />;
}
