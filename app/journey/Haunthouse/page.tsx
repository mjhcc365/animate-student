'use client'
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function HaunthouseDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

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
    camera.position.z = 5;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，使动画更平滑
    controls.dampingFactor = 0.05; // 阻尼系数

    // 添加网格辅助线以便于可视化
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    scene.add(gridHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 动态导入dat.gui，确保只在浏览器环境中执行
    import("dat.gui").then((dat) => {
      // 创建GUI控制器
      const gui = new dat.GUI();

      // 相机控制选项
      const cameraControls = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };

      gui.add(cameraControls, "x", -10, 10).onChange((value) => {
        camera.position.x = value;
        camera.lookAt(0, 0, 0);
      });

      gui.add(cameraControls, "y", -10, 10).onChange((value) => {
        camera.position.y = value;
        camera.lookAt(0, 0, 0);
      });

      gui.add(cameraControls, "z", -10, 10).onChange((value) => {
        camera.position.z = value;
        camera.lookAt(0, 0, 0);
      });
    });

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
      container.removeChild(renderer.domElement);
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
