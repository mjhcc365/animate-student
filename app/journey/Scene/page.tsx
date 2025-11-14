// app/journey/Scene/page.tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
// 使用 @types/three 提供的类型声明
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import firefliesVertexShader from "./shaders/vertex.glsl";
import firefliesFragmentShader from "./shaders/fragment.glsl";

export default function ThreeBasicDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 确保只在客户端环境中执行THREE.js相关代码
    if (typeof window === "undefined") {
      return;
    }

    // 场景
    const scene = new THREE.Scene();
    // 设置背景颜色
    scene.background = new THREE.Color("#201919");
    // 相机
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    // camera.position.z = 2;
    camera.position.set(2, 2, 2);
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 创建DRACOLoader
    const dracoLoader = new DRACOLoader();
    // 设置draco解码器的路径
    dracoLoader.setDecoderPath("/draco/");

    // 创建GLTFLoader并设置DRACOLoader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // 模型引用
    let portalModel: THREE.Group | null = null;
    // 轨道控制器
    let controls: OrbitControls | null = null;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    const bakedTexture = textureLoader.load(
      "/journey/resources/scene/baked.jpg"
    );
    bakedTexture.flipY = false;
    bakedTexture.colorSpace = THREE.SRGBColorSpace;

    // 加载模型
    gltfLoader.load("/journey/resources/scene/portal.glb", (gltf: any) => {
      // // Baked material
      const bakedMaterial = new THREE.MeshBasicMaterial({
        map: bakedTexture,
      });

      // Portal light material
      const portalLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });

      // Pole light material
      const poleLightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffe5,
      });

      const bakedMesh = gltf.scene.children.find(
        (child: THREE.Object3D) => child.name === "baked"
      );
      const portalLightMesh = gltf.scene.children.find(
        (child: THREE.Object3D) => child.name === "portalLight"
      ) as THREE.Mesh;
      const poleLightAMesh = gltf.scene.children.find(
        (child: THREE.Object3D) => child.name === "poleLightA"
      ) as THREE.Mesh;
      const poleLightBMesh = gltf.scene.children.find(
        (child: THREE.Object3D) => child.name === "poleLightB"
      ) as THREE.Mesh;

      bakedMesh.material = bakedMaterial;
      portalLightMesh.material = portalLightMaterial;
      poleLightAMesh.material = poleLightMaterial;
      poleLightBMesh.material = poleLightMaterial;

      scene.add(gltf.scene);
      // 设置模型引用
      portalModel = gltf.scene;

      console.log("Portal model loaded successfully");
    });

    // 挂载到 DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);

      // 创建轨道控制器
      controls = new OrbitControls(camera, renderer.domElement);
      // 启用阻尼效果
      controls.enableDamping = true;
      // 设置阻尼系数
      controls.dampingFactor = 0.05;
      // 限制垂直旋转范围
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI;
    }

    // 添加萤火虫（在客户端环境中执行）
    let firefliesPoints: THREE.Points | null = null;

    // 确保在客户端环境中执行随机数生成和萤火虫创建
    if (typeof window !== "undefined") {
      const fireflyGeometry = new THREE.BufferGeometry();
      const firefliesCount = 30;
      // 萤火虫顶点位置
      const fireflyPositions = new Float32Array(firefliesCount * 3);
      for (let i = 0; i < firefliesCount; i++) {
        fireflyPositions[i * 3] = Math.random() * 4; // x
        fireflyPositions[i * 3 + 1] = Math.random() * 4; // y
        fireflyPositions[i * 3 + 2] = Math.random() * 4; // z
      }
      fireflyGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(fireflyPositions, 3)
      );

      const firefliesMaterial = new THREE.ShaderMaterial({
        vertexShader: firefliesVertexShader,
        fragmentShader: firefliesFragmentShader,
        transparent: true,
      });

      firefliesPoints = new THREE.Points(fireflyGeometry, firefliesMaterial);
      scene.add(firefliesPoints);
    }

    // 动画
    let frameId: number;
    const animate = () => {
      // 更新控制器（如果启用了阻尼）
      if (controls) {
        controls.update();
      }

      // 如果模型已加载，让它旋转
      // if (portalModel) {
      //   portalModel.rotation.y += 0.01;
      // }

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
      // 清理控制器
      if (controls) {
        controls.dispose();
      }
      renderer.dispose();
      // 清理模型
      if (portalModel) {
        scene.remove(portalModel);
      }
    };
  }, []);

  return <div ref={mountRef} />;
}
