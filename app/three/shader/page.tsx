"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 定义pattern配置
const patterns = [
  { id: "01", name: "彩虹渐变" },
  { id: "02", name: "径向条纹" },
  { id: "03", name: "棋盘波浪" },
  { id: "04", name: "横向渐变" },
];

// 缓存已加载的shader
const shaderCache = new Map<
  string,
  { vertexShader: string; fragmentShader: string }
>();

// 防抖函数
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// 性能监控组件
const PerformanceMonitor = ({ fps, memory }: { fps: number; memory: any }) => (
  <div className="flex gap-4 text-xs text-gray-600">
    <span>FPS: {fps}</span>
    {memory && (
      <>
        <span>几何体: {memory.geometries}</span>
        <span>材质: {memory.textures}</span>
      </>
    )}
  </div>
);

// 预加载所有shader
const preloadShaders = async () => {
  const loadPromises = patterns.map(async (pattern) => {
    try {
      const [vertexShader, fragmentShader] = await Promise.all([
        import(`./patterns/${pattern.id}/vertex.glsl`),
        import(`./patterns/${pattern.id}/fragment.glsl`),
      ]);
      shaderCache.set(pattern.id, {
        vertexShader: vertexShader.default,
        fragmentShader: fragmentShader.default,
      });
    } catch (error) {
      console.error(
        `Failed to preload shader for pattern ${pattern.id}:`,
        error
      );
    }
  });

  await Promise.all(loadPromises);
};

export default function ShaderDemo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPattern, setSelectedPattern] = useState("01");
  const [isLoading, setIsLoading] = useState(true);
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<any>(null);

  // 使用ref来存储Three.js对象，避免不必要的重渲染
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const renderTimeRef = useRef<number>(0);

  // 获取shader的缓存函数
  const getShader = useCallback((patternId: string) => {
    return shaderCache.get(patternId) || null;
  }, []);

  // 创建几何体的memoized函数
  const createGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(5, 5, 100, 100);
  }, []);

  // 更新shader的函数
  const updateShader = useCallback(
    async (patternId: string) => {
      if (!sceneRef.current || !rendererRef.current) return;

      const shaders = getShader(patternId);
      if (!shaders) {
        console.error(`Shader not found for pattern ${patternId}`);
        return;
      }

      // 移除旧的mesh
      if (meshRef.current) {
        sceneRef.current.remove(meshRef.current);
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((material) => material.dispose());
        } else {
          meshRef.current.material.dispose();
        }
      }

      // 创建新的材质
      const material = new THREE.RawShaderMaterial({
        vertexShader: shaders.vertexShader,
        fragmentShader: shaders.fragmentShader,
        side: THREE.DoubleSide,
      });

      // 使用缓存的几何体
      const newMesh = new THREE.Mesh(createGeometry, material);
      sceneRef.current.add(newMesh);
      meshRef.current = newMesh;
    },
    [getShader, createGeometry]
  );

  // 优化的动画循环函数
  const animate = useCallback((currentTime: number) => {
    if (
      !sceneRef.current ||
      !cameraRef.current ||
      !rendererRef.current ||
      !controlsRef.current
    )
      return;

    // FPS计算
    frameCountRef.current++;
    if (currentTime - lastTimeRef.current >= 1000) {
      setFps(
        Math.round(
          (frameCountRef.current * 1000) / (currentTime - lastTimeRef.current)
        )
      );
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;

      // 更新内存信息
      if (rendererRef.current) {
        const info = rendererRef.current.info;
        setMemory({
          geometries: info.memory.geometries,
          textures: info.memory.textures,
        });
      }
    }

    // 只在控制器有变化时才渲染
    if (controlsRef.current.enabled) {
      const startTime = performance.now();
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      renderTimeRef.current = performance.now() - startTime;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // 防抖的pattern切换处理
  const debouncedUpdateShader = useMemo(
    () => debounce((patternId: string) => updateShader(patternId), 100),
    [updateShader]
  );
  // 初始化Three.js场景
  useEffect(() => {
    if (!mountRef.current) return;

    // 预加载shader
    preloadShaders().then(() => {
      setIsLoading(false);
    });

    // 场景
    const scene = new THREE.Scene();
    // 相机
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 5;
    // 渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
      stencil: false,
      depth: true,
    });
    renderer.setSize(600, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 限制像素比
    renderer.shadowMap.enabled = false; // 禁用阴影以提高性能

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
    mountRef.current.appendChild(renderer.domElement);

    // 存储引用
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    // 清理
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
      createGeometry.dispose();
    };
  }, [createGeometry]);

  // 处理pattern切换
  useEffect(() => {
    if (isLoading) return;
    debouncedUpdateShader(selectedPattern);
  }, [selectedPattern, isLoading, debouncedUpdateShader]);

  // 启动动画循环
  useEffect(() => {
    if (isLoading) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, isLoading]);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = debounce(() => {
      if (cameraRef.current && rendererRef.current) {
        const width = 600;
        const height = 400;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    }, 250);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="pattern-select" className="text-lg font-medium">
            选择Pattern:
          </label>
          <select
            id="pattern-select"
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            disabled={isLoading}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {patterns.map((pattern) => (
              <option key={pattern.id} value={pattern.id}>
                {pattern.name}
              </option>
            ))}
          </select>
        </div>
        {isLoading && <span className="text-sm text-gray-500">加载中...</span>}
        <PerformanceMonitor fps={fps} memory={memory} />
      </div>
      <div
        ref={mountRef}
        className="border border-gray-200 rounded-lg overflow-hidden"
      />
    </div>
  );
}
