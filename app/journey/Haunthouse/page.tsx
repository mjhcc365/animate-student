"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// const floorColorTexture = textureLoader.load(
//   "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
// );
// const floorARMTexture = textureLoader.load(
//   "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
// );
// const floorNormalTexture = textureLoader.load(
//   "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
// );
// const floorDisplacementTexture = textureLoader.load(
//   "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
// );

export default function HaunthouseDemo() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

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

    // 加载纹理，使用资源文件夹的相对路径
    const floorAlphaTexture = loadTexture("./resources/floor/alpha.webp");
    const floorColorTexture = loadTexture(
      "./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
    );
    const floorARMTexture = loadTexture(
      "./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
    );
    const floorNormalTexture = loadTexture(
      "./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
    );
    const floorDisplacementTexture = loadTexture(
      "./resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
    );

    // 设置重复值，使纹理在平面上重复显示
    floorColorTexture.repeat.set(4, 4);
    floorARMTexture.repeat.set(4, 4);
    floorNormalTexture.repeat.set(4, 4);
    floorDisplacementTexture.repeat.set(4, 4);

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
    // const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    // scene.add(gridHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 添加地板
    const floor = new THREE.PlaneGeometry(20, 20, 100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({
      // 使用颜色纹理而不是单一颜色
      map: floorColorTexture,

      // 使用ARM纹理中的alpha通道作为AO贴图
      aoMap: floorARMTexture,
      aoMapIntensity: 1.0,

      // 使用ARM纹理的绿色通道作为粗糙度贴图
      roughnessMap: floorARMTexture,
      roughness: 0.5, // 基础粗糙度，将与纹理混合

      // 使用ARM纹理的蓝色通道作为金属度贴图
      metalnessMap: floorARMTexture,
      metalness: 0.2, // 基础金属度，将与纹理混合

      // 法线贴图，增加表面细节
      normalMap: floorNormalTexture,
      normalScale: new THREE.Vector2(1, 1),

      // 置换贴图，增加表面深度
      displacementMap: floorDisplacementTexture,
      displacementScale: 0.3,
      displacementBias: -0.15,

      // alpha贴图和透明度设置
      alphaMap: floorAlphaTexture,
      transparent: floorAlphaTexture ? true : false,

      // 其他材质参数
      emissive: 0x000000, // 无自发光
      flatShading: false, // 平滑着色
    });

    // 确保地板几何体有法线和uv2属性（用于aoMap）
    floor.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(floor.attributes.uv.array, 2)
    );
    const floorMesh = new THREE.Mesh(floor, floorMaterial);
    floorMesh.rotateX(-Math.PI / 2); // 旋转90度，使地板水平
    scene.add(floorMesh);

    // house
    const house = new THREE.Group();
    scene.add(house);

    // Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({
        color: 0x8d99ae, // 颜色
        roughness: 0.5, // 粗糙度，0为光滑，1为粗糙
        metalness: 0.2, // 金属度，0为非金属，1为金属
        emissive: 0x000000, // 自发光颜色
        flatShading: false, // 平滑着色
      })
    );
    walls.position.y += 1.25;
    house.add(walls);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 1.5, 4),
      new THREE.MeshStandardMaterial()
    );
    roof.position.y = 2.5 + 0.75;
    roof.rotateY(Math.PI / 4);
    house.add(roof);

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2),
      new THREE.MeshStandardMaterial({ color: "red" })
    );
    door.position.y += 1.1;
    door.position.z = 2 + 0.01;
    house.add(door);

    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial();

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush1.scale.set(0.5, 0.5, 0.5);
    bush1.position.set(0.8, 0.2, 2.2);

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.4, 0.1, 2.1);

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush3.scale.set(0.4, 0.4, 0.4);
    bush3.position.set(-0.8, 0.1, 2.2);

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);
    bush4.position.set(-1, 0.05, 2.6);

    house.add(bush1, bush2, bush3, bush4);

    // Graves
    const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
    const graveMaterial = new THREE.MeshStandardMaterial();

    const graves = new THREE.Group();
    for (let i = 0; i < 30; i++) {
      // Mesh
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Mesh
      const grave = new THREE.Mesh(graveGeometry, graveMaterial);
      grave.position.x = x;
      grave.position.y = Math.random() * 0.4;
      grave.position.z = z;
      grave.rotation.x = (Math.random() - 0.5) * 0.4;
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;

      // Add to the graves group
      graves.add(grave);
    }
    scene.add(graves);

    // 创建一个球体，使用MeshStandardMaterial材质
    // const geometry = new THREE.SphereGeometry(1, 32, 32); // 半径为1的球体，32个宽度段，32个高度段

    // // MeshStandardMaterial材质设置，支持PBR（基于物理的渲染）
    // const material = new THREE.MeshStandardMaterial({
    //   color: 0xff6b6b, // 颜色
    //   roughness: 0.5, // 粗糙度，0为光滑，1为粗糙
    //   metalness: 0.2, // 金属度，0为非金属，1为金属
    //   emissive: 0x000000, // 自发光颜色
    //   flatShading: false, // 平滑着色
    // });

    // 创建网格并添加到场景
    // const sphere = new THREE.Mesh(geometry, material);
    // sphere.position.set(0, 1, 0); // 设置球体位置
    // scene.add(sphere);

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

      // 释放纹理资源
      if (floorAlphaTexture) floorAlphaTexture.dispose();
      if (floorColorTexture) floorColorTexture.dispose();
      if (floorARMTexture) floorARMTexture.dispose();
      if (floorNormalTexture) floorNormalTexture.dispose();
      if (floorDisplacementTexture) floorDisplacementTexture.dispose();

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
