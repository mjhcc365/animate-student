"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";

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

    // floor 加载纹理，使用资源文件夹的相对路径
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

    floorColorTexture.colorSpace = THREE.SRGBColorSpace;
    floorColorTexture.repeat.set(8, 8);
    floorARMTexture.repeat.set(8, 8);
    floorNormalTexture.repeat.set(8, 8);
    floorDisplacementTexture.repeat.set(8, 8);

    // Wall
    const wallColorTexture = loadTexture(
      "./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
    );
    const wallARMTexture = loadTexture(
      "./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
    );
    const wallNormalTexture = loadTexture(
      "./resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
    );

    wallColorTexture.colorSpace = THREE.SRGBColorSpace;

    // Roof
    const roofColorTexture = loadTexture(
      "./resources/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
    );
    const roofARMTexture = loadTexture(
      "./resources/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
    );
    const roofNormalTexture = loadTexture(
      "./resources/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
    );

    roofColorTexture.colorSpace = THREE.SRGBColorSpace;
    roofColorTexture.repeat.set(3, 1);
    roofARMTexture.repeat.set(3, 1);
    roofNormalTexture.repeat.set(3, 1);
    roofColorTexture.wrapS = THREE.RepeatWrapping;
    roofARMTexture.wrapS = THREE.RepeatWrapping;
    roofNormalTexture.wrapS = THREE.RepeatWrapping;

    // Bush
    const bushColorTexture = loadTexture(
      "./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
    );
    const bushARMTexture = loadTexture(
      "./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
    );
    const bushNormalTexture = loadTexture(
      "./resources/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
    );

    bushColorTexture.colorSpace = THREE.SRGBColorSpace;

    bushColorTexture.repeat.set(2, 1);
    bushARMTexture.repeat.set(2, 1);
    bushNormalTexture.repeat.set(2, 1);

    bushColorTexture.wrapS = THREE.RepeatWrapping;
    bushARMTexture.wrapS = THREE.RepeatWrapping;
    bushNormalTexture.wrapS = THREE.RepeatWrapping;

    // Grave
    const graveColorTexture = loadTexture(
      "./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
    );
    const graveARMTexture = loadTexture(
      "./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
    );
    const graveNormalTexture = loadTexture(
      "./resources/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
    );

    graveColorTexture.colorSpace = THREE.SRGBColorSpace;

    graveColorTexture.repeat.set(0.3, 0.4);
    graveARMTexture.repeat.set(0.3, 0.4);
    graveNormalTexture.repeat.set(0.3, 0.4);

    // Door
    const doorColorTexture = loadTexture("./resources/door/color.jpg");
    const doorAlphaTexture = loadTexture("./resources/door/alpha.jpg");
    const doorAmbientOcclusionTexture = loadTexture(
      "./resources/door/ambientOcclusion.jpg"
    );
    const doorHeightTexture = loadTexture("./resources/door/height.jpg");
    const doorNormalTexture = loadTexture("./resources/door/normal.jpg");
    const doorMetalnessTexture = loadTexture("./resources/door/metalness.jpg");
    const doorRoughnessTexture = loadTexture("./resources/door/roughness.jpg");

    doorColorTexture.colorSpace = THREE.SRGBColorSpace;

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
    camera.position.z = 10;
    camera.position.y = 4;
    camera.position.x = 5.5;
    camera.lookAt(0, 0, 0);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，使动画更平滑
    controls.dampingFactor = 0.05; // 阻尼系数
    // 固定y轴视角，使相机不能上下旋转
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2.2;
    // 可选：禁用y轴平移
    controls.screenSpacePanning = false;
    controls.enablePan = false;

    // 添加网格辅助线以便于可视化
    // const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    // scene.add(gridHelper);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
    scene.add(ambientLight);

    // 添加方向光
    const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
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
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
      })
    );
    walls.position.y += 1.25;
    house.add(walls);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 1.5, 4),
      new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
      })
    );
    roof.position.y = 2.5 + 0.75;
    roof.rotateY(Math.PI / 4);
    house.add(roof);

    // Door - 注意：位移贴图需要几何体有足够的分段数才能生效
    // 修改PlaneGeometry参数，增加分段数以支持位移贴图效果
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2, 128, 128), // 增加分段数到128×128
      new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
      })
    );
    door.position.y += 1.1;
    // 墙壁的BoxGeometry深度为4，所以墙壁的前面位置在z=2
    // 为了让门完全贴合墙壁且避免z-fighting，使用一个很小的偏移量
    door.position.z = 2 + 0.01; // 0.01足够小以避免明显间隙，同时避免z-fighting
    house.add(door);

    // Door light
    const doorLight = new THREE.PointLight("#ff7d46", 5);
    doorLight.position.set(0, 2.2, 2.5);
    house.add(doorLight);

    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial({
      color: "#ccffcc",
      map: bushColorTexture,
      aoMap: bushARMTexture,
      roughnessMap: bushARMTexture,
      metalnessMap: bushARMTexture,
      normalMap: bushNormalTexture,
    });

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
    const graveMaterial = new THREE.MeshStandardMaterial({
      map: graveColorTexture,
      normalMap: graveNormalTexture,
      aoMap: graveARMTexture,
      roughnessMap: graveARMTexture,
      metalnessMap: graveARMTexture,
    });

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

    /**
     * Ghosts
     */
    const ghost1 = new THREE.PointLight("#8800ff", 6);
    const ghost2 = new THREE.PointLight("#ff0088", 6);
    const ghost3 = new THREE.PointLight("#ff0000", 6);
    scene.add(ghost1, ghost2, ghost3);
    /**
     * Animate
     */
    const timer = new Timer();

    const tick = () => {
      // Timer
      timer.update();
      const elapsedTime = timer.getElapsed();

      // Ghosts
      const ghost1Angle = elapsedTime * 0.5;
      ghost1.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.position.y =
        Math.sin(ghost1Angle) *
        Math.sin(ghost1Angle * 2.34) *
        Math.sin(ghost1Angle * 3.45);

      const ghost2Angle = -elapsedTime * 0.38;
      ghost2.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.position.y =
        Math.sin(ghost2Angle) *
        Math.sin(ghost2Angle * 2.34) *
        Math.sin(ghost2Angle * 3.45);

      const ghost3Angle = elapsedTime * 0.23;
      ghost3.position.x = Math.cos(ghost3Angle) * 6;
      ghost3.position.z = Math.sin(ghost3Angle) * 6;
      ghost3.position.y =
        Math.sin(ghost3Angle) *
        Math.sin(ghost3Angle * 2.34) *
        Math.sin(ghost3Angle * 3.45);

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    /**
     * Shadows
     */
    // Renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Cast and receive
    directionalLight.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;

    walls.castShadow = true;
    walls.receiveShadow = true;
    roof.castShadow = true;
    floorMesh.receiveShadow = true;

    for (const grave of graves.children) {
      grave.castShadow = true;
      grave.receiveShadow = true;
    }

    // Mappings
    directionalLight.shadow.mapSize.width = 256;
    directionalLight.shadow.mapSize.height = 256;
    directionalLight.shadow.camera.top = 8;
    directionalLight.shadow.camera.right = 8;
    directionalLight.shadow.camera.bottom = -8;
    directionalLight.shadow.camera.left = -8;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 20;

    ghost1.shadow.mapSize.width = 256;
    ghost1.shadow.mapSize.height = 256;
    ghost1.shadow.camera.far = 10;

    ghost2.shadow.mapSize.width = 256;
    ghost2.shadow.mapSize.height = 256;
    ghost2.shadow.camera.far = 10;

    ghost3.shadow.mapSize.width = 256;
    ghost3.shadow.mapSize.height = 256;
    ghost3.shadow.camera.far = 10;

    /**
     * Sky
     */
    const sky = new Sky();
    sky.scale.set(100, 100, 100);
    scene.add(sky);
    sky.material.uniforms["turbidity"].value = 10;
    sky.material.uniforms["rayleigh"].value = 3;
    sky.material.uniforms["mieCoefficient"].value = 0.1;
    sky.material.uniforms["mieDirectionalG"].value = 0.95;
    sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

    /**
     * Fog
     */
    // scene.fog = new THREE.Fog('#04343f', 1, 13)
    scene.fog = new THREE.FogExp2("#04343f", 0.1);

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
    // import("dat.gui").then((dat) => {
    //   // 创建GUI控制器
    //   const gui = new dat.GUI();

    //   // 相机控制选项
    //   const cameraControls = {
    //     x: camera.position.x,
    //     y: camera.position.y,
    //     z: camera.position.z,
    //   };

    //   gui.add(cameraControls, "x", -10, 10).onChange((value) => {
    //     camera.position.x = value;
    //     camera.lookAt(0, 0, 0);
    //   });

    //   gui.add(cameraControls, "y", -10, 10).onChange((value) => {
    //     camera.position.y = value;
    //     camera.lookAt(0, 0, 0);
    //   });

    //   gui.add(cameraControls, "z", -10, 10).onChange((value) => {
    //     camera.position.z = value;
    //     camera.lookAt(0, 0, 0);
    //   });
    // });

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
