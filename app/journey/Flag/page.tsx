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
    camera.position.set(0, 3, 5);
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

    // 创建TextureLoader实例
    const textureLoader = new THREE.TextureLoader();

    // 加载纹理 - 在Next.js中，我们需要使用绝对路径或确保相对路径正确解析
    // 为了确保纹理正确加载，我们添加加载完成回调和错误处理

    const loadTexture = (path: string, onLoad?: any) => {
      return textureLoader.load(
        path,
        (texture) => {
          // // 设置纹理参数以优化渲染
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          if (onLoad) onLoad(texture);
        },
        undefined,
        (error) => {
          console.error(`加载纹理失败: ${path}`, error);
        }
      );
    };

    // floor 加载纹理，使用public目录下的正确路径
    const flagTexture = loadTexture("/journey/resources/flag/flag.jpg");

    // 添加平面并使用ShaderMaterial
    const planeGeometry = new THREE.PlaneGeometry(20, 26); // 创建5x3大小的平面
    planeGeometry.scale(0.2, 0.2, 0.2); // 缩放平面到合适大小
    planeGeometry.rotateX(-Math.PI / 2); // 旋转平面90度，使其垂直于屏幕

    // 创建ShaderMaterial，使用我们的着色器文件
    const planeMaterial = new THREE.ShaderMaterial({
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uTexture: { value: flagTexture },
        uTime: { value: 0.0 },
      },
      side: THREE.DoubleSide, // 使纹理在两面都可见
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(plane); // 将平面添加到场景

    let material: THREE.ShaderMaterial | null = null;

    // 保存planeMaterial引用，用于动画更新
    material = planeMaterial;

    // 动画循环
    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // 更新uTime变量
      if (material && material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
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
      if (material && typeof material.dispose === "function") {
        material.dispose();
      }
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
