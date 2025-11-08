"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function HaunthouseDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 创建TextureLoader实例
    const textureLoader = new THREE.TextureLoader();

    // 获取容器尺寸
    const container = mountRef.current;
    const { clientWidth, clientHeight } = container;

    // 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 相机 - 使用容器宽高比
    const camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    camera.position.y = 3;
    camera.position.x = 3;
    camera.lookAt(0, 0, 0);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，使动画更平滑

    // 添加网格辅助线以便于可视化
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    scene.add(gridHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
    scene.add(ambientLight);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const ball = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.PointsMaterial({
      color: "red",
      size: 0.01,
      sizeAttenuation: true,
    });

    const ballPoint = new THREE.Points(ball, material);
    scene.add(ballPoint);

    /** custom geometry */
    const particlesCount = 10000;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    const sphereMaterial = new THREE.PointsMaterial({
      color: "pink",
      size: 0.01,
      sizeAttenuation: true,
    });
    sphereMaterial.alphaTest = 0.001;

    const particlesGeometry = new THREE.BufferGeometry();

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const sphere = new THREE.Points(particlesGeometry, sphereMaterial);

    scene.add(sphere);

    // 将渲染器的DOM元素添加到挂载点
    container.appendChild(renderer.domElement);

    // 动画循环
    function animate() {
      requestAnimationFrame(animate);
      controls.update(); // 更新控制器
      renderer.render(scene, camera);
    }
    animate();

    // 窗口大小改变时的响应
    function onWindowResize() {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", onWindowResize);
      controls.dispose(); // 清理控制器

      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} className="haunthouse-container" />
      <style jsx>{`
        .haunthouse-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        /* 媒体查询：移动端 */
        @media (max-width: 768px) {
          .haunthouse-container {
            width: 100vw;
            height: 80vh;
          }
        }

        /* 媒体查询：平板设备 */
        @media (min-width: 769px) and (max-width: 1024px) {
          .haunthouse-container {
            width: 100vw;
            height: 90vh;
          }
        }

        /* 媒体查询：桌面设备 */
        @media (min-width: 1025px) {
          .haunthouse-container {
            width: 100vw;
            height: 100vh;
          }
        }
      `}</style>
    </div>
  );
}
