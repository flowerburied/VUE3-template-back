<template>
  <div class="myThreeDome">
    <el-card>
      <el-button type="danger" plain @click="testcolor">测试</el-button>

      <span class="colorPicker">
        <input id="details-color" type="color" v-model="value" />
        <br />Details</span
      >
      <div ref="container"></div>

      <!-- <model-gltf
        id="place"
        :backgroundAlpha="bgAlpha"
        :backgroundColor="bgColor"
        :rotation="rotation"
        :src="`/automobile/scene.gltf`"
      ></model-gltf> -->
    </el-card>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //旋转摄像机
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import Stats from "stats-js";
import { RGBELoader } from "three/examples//jsm/loaders/RGBELoader.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default {
  setup() {
    const datas = reactive({
      container: null, //DOM对象
      action: null, //控制运动
      isaction: false,
      value: "#1e272e",
      test: null,
      mixer: null,
      clock: null,
      animactionMixer: null,
      camera: null, //设置自由摄像机
      //   scene: null,
      renderer: null,
      controls: null,
      stats: null,
      // 材质
      material: null,
      detailsMaterial: null,
    });

    const { proxy } = getCurrentInstance();
    const scene = new THREE.Scene(); //创建实例

    const render = () => {
      datas.renderer.render(scene, datas.camera);
    };
    const setCamera = () => {
      //创建相机
      let width = window.innerWidth / 2;
      let Height = window.innerHeight / 2;
      datas.camera = new THREE.PerspectiveCamera(75, width / Height, 0.1, 500000);
      //设置自由相机
      datas.camera.position.set(5, 10, 15);

      datas.controls = new OrbitControls(datas.camera, datas.renderer.domElement);
      datas.controls.addEventListener("change", function () {
        render();
      }); // use if there is no animation loop
      datas.controls.minDistance = 2;
      datas.controls.maxDistance = 1000;
      datas.controls.target.set(0, 0, -0.2);
      datas.controls.update();

      window.addEventListener("resize", onWindowResize(scene, datas.renderer));
    };

    const setLight = () => {
      const light = new THREE.PointLight(0xffffff, 2, 100);
      light.position.set(10, 10, 10);
      light.castShadow = true; // default false
      scene.add(light);
      const sphereSize = 1;
      const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
      scene.add(pointLightHelper);

      const rectLight1 = new THREE.RectAreaLight(0xffffff, 50, 10, 10);
      rectLight1.position.set(-5, 5, 20);
      scene.add(rectLight1);
      scene.add(new RectAreaLightHelper(rectLight1));
    };

    const setAxes = () => {
      // 坐标轴
      var axes = new THREE.AxesHelper(40);
      scene.add(axes);
    };

    const onWindowResize = (scene, renderer) => {
      datas.camera.aspect = window.innerWidth / window.innerHeight;
      datas.camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

      renderer.render(scene, datas.camera);
    };

    const hdrLoader = () => {
      new RGBELoader().setPath("/automobile/hdr/").load("029.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
        datas.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0,
          roughness: 0,
          ior: 1.5,
          // alphaMap: texture1,
          envMap: texture,
          envMapIntensity: 1,
          transmission: 1, // use material.transmission for glass materials
          specularIntensity: 1,
          specularTint: 0xffffff,
          opacity: 1,
          side: THREE.DoubleSide,
          transparent: true,
        });

        render();
      });
    };
    const modelLoader = () => {
      const loader = new GLTFLoader().setPath("/automobile/test-dome/");
      loader.load(
        "Audi-R8.gltf",
        function (gltf) {
          console.log("gltf", gltf);

          //   材质
          console.log("detailsMaterial", datas.detailsMaterial);

          //   gltf.scene.children[3].children[1].material = datas.detailsMaterial;
          // console.log("gltf.scene", gltf.scene);
          //   gltf.scene.children[2].children[0].material = datas.material;
          // gltf.scene.children[3].children[3].children[0].material = detailsMaterial;

          const group = gltf.scene.getObjectByName("Car_Body");

          // group.getObjectByName("Plane016").material = datas.detailsMaterial;
          group.traverse(function (child) {
            if (child.isMesh) {
              //   console.log("child", child);
              child.material = datas.detailsMaterial;
            }
          });

          group.getObjectByName("Front_Glass").material = datas.material;

          const driverDoor = gltf.scene.getObjectByName("Driver_door");
          console.log("driverDoor", driverDoor);
          driverDoor.traverse(function (child) {
            if (child.isMesh) {
              //   console.log("child", child);
              child.material = datas.detailsMaterial;
            }
          });

          // 动画
          scene.add(gltf.scene);
          render();
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded glft");
        },
        // called when loading has errors
        (error) => {
          console.log("An error happened", error);
        }
      );
    };

    const setStats = () => {
      // 监听动画帧
      datas.stats = new Stats();
      // stats.showPanel(0);
      //   console.log("stats", stats);
      datas.stats.dom.style.position = "relative";
      datas.container.appendChild(datas.stats.dom);
    };

    const setText = () => {
      // 创建动画实例
      //   const animactionMixer = new THREE.AnimationMixer(scene);
      datas.detailsMaterial = new THREE.MeshStandardMaterial({
        color: 0x0,
        metalness: 0,
        roughness: 0,
      });
      const detailsColorInput = document.getElementById("details-color");
      detailsColorInput.addEventListener("input", function () {
        datas.detailsMaterial.color.set(this.value);
      });

      const texture1 = new THREE.CanvasTexture(generateTexture());
      texture1.magFilter = THREE.NearestFilter;
      texture1.wrapT = THREE.RepeatWrapping;
      texture1.wrapS = THREE.RepeatWrapping;
      texture1.repeat.set(1, 3.5);

      // 生成模型

      function generateTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 2;
        canvas.height = 2;

        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 1, 2, 1);

        return canvas;
      }
    };

    const setRenderer = () => {
      datas.renderer = new THREE.WebGLRenderer({ antialias: true });
      datas.renderer.setPixelRatio(window.devicePixelRatio);
      datas.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      datas.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      datas.renderer.toneMappingExposure = 1;
      datas.renderer.outputEncoding = THREE.sRGBEncoding;
      datas.container.appendChild(datas.renderer.domElement); //输出至画板
    };

    const init = () => {
      console.log("proxy", proxy);

      setRenderer();
      setCamera();
      setAxes();
      setLight();
      setStats();
      setText();
      hdrLoader();
      modelLoader();
      // const geometry = new THREE.SphereGeometry(20, 64, 32);

      //   function render() {
      //     renderer.render(scene, datas.camera);
      //   }

      datas.clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        if (datas.animactionMixer) datas.animactionMixer.update(datas.clock.getDelta());
        datas.stats.update();
        datas.controls.update(); // required if damping enabled
        render();
      }
      animate();
    };

    const testcolor = () => {
      console.log("color", datas.value);
    };

    onMounted(() => {
      init();
    });

    return {
      ...toRefs(datas),
      testcolor,
    };
  },
};
</script>

<style lang="scss">
#container {
  /* height: 400px; */
}
.colorPicker {
  display: inline-block;
  margin: 0 10px;
}
</style>
