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

import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; //旋转摄像机
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
// import { Camera } from "@element-plus/icons";
import Stats from "stats-js";
import { RGBELoader } from "three/examples//jsm/loaders/RGBELoader.js";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

// import { ModelGltf } from "vue-3d-model";
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
    });

    const { proxy } = getCurrentInstance();

    const AreaOfTriangle = (p1, p2, p3) => {
      // let v1 = new THREE.Vector3();
      // let v2 = new THREE.Vector3();
      // // 通过两点坐标计算其中两条边构成的向量
      // v1 = p1.clone().sub(p2);
      // v2 = p1.clone().sub(p3);

      // let v3 = new THREE.Vector3();
      // // 三角形面积
      // v3.crossVectors(v1, v2);
      // let s = v3.length() / 2;
      // return s;

      return p1.clone().cross(p2).dot(p3) / 6;
    };

    const init = () => {
      console.log("proxy", proxy);
      var scene = new THREE.Scene(); //创建实例

      //创建相机
      let width = window.innerWidth / 2;
      let Height = window.innerHeight / 2;
      var camera = new THREE.PerspectiveCamera(75, width / Height, 0.1, 500000);

      //设置自由相机

      camera.position.set(5, 10, 15);
      // 设置渲染器
      var renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器 https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputEncoding = THREE.sRGBEncoding;
      datas.container.appendChild(renderer.domElement); //输出至画板

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", render); // use if there is no animation loop
      controls.minDistance = 2;
      controls.maxDistance = 1000;
      controls.target.set(0, 0, -0.2);
      controls.update();

      window.addEventListener("resize", onWindowResize);
      // 坐标轴
      var axes = new THREE.AxesHelper(40);
      scene.add(axes);

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
      // 监听动画帧
      const stats = new Stats();
      // stats.showPanel(0);
      console.log("stats", stats);
      stats.dom.style.position = "relative";
      datas.container.appendChild(stats.dom);
      // 创建动画实例
      //   const animactionMixer = new THREE.AnimationMixer(scene);
      const detailsMaterial = new THREE.MeshStandardMaterial({
        color: 0x130f40,
        metalness: 0,
        roughness: 0,
      });
      const detailsColorInput = document.getElementById("details-color");
      detailsColorInput.addEventListener("input", function () {
        detailsMaterial.color.set(this.value);
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

      // const geometry = new THREE.SphereGeometry(20, 64, 32);

      new RGBELoader().setPath("/automobile/hdr/").load("029.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        const material = new THREE.MeshPhysicalMaterial({
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

        // const mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);
        render();

        // model

        // use of RoughnessMipmapper is optional
        // const roughnessMipmapper = new RoughnessMipmapper(renderer);

        const loader = new STLLoader();
        loader.load(
          // resource URL
          "/automobile/test-dome/test001.stl",
          // called when resource is loaded
          function (geometry) {
            const geometry1 = new THREE.BoxGeometry(10, 10, 10);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            console.log("geometry", geometry);
            // console.log("趋于", 3 % 3);
            // geometry.attributes.position.array.forEach(element => {

            // });

            let arraynum = geometry.attributes.position.array;
            let getarr = [];
            let area = 0.0;
            for (let i = 0; i < arraynum.length; i++) {
              if (i % 3 == 0) {
                let option = {
                  p1: arraynum[i],
                  p2: arraynum[i + 1],
                  p3: arraynum[i + 2],
                };
                getarr.push(option);
                // area += AreaOfTriangle(option.p1, option.p2, option.p3);
              }
            }

            for (let c = 0; c < getarr.length; c++) {
              if (c % 3 == 0) {
                const a1 = new THREE.Vector3(getarr[c].p1, getarr[c].p2, getarr[c].p3);
                const b1 = new THREE.Vector3(
                  getarr[c + 1].p1,
                  getarr[c + 1].p2,
                  getarr[c + 1].p3
                );
                const c1 = new THREE.Vector3(
                  getarr[c + 2].p1,
                  getarr[c + 2].p2,
                  getarr[c + 2].p3
                );
                console.log("AreaOfTriangle(a1, b1, c1)", a1);
                console.log("AreaOfTriangle", AreaOfTriangle(a1, b1, c1));
                area += AreaOfTriangle(a1, b1, c1);
              }
            }

            console.log("getarr", getarr);
            console.log("area", area);
            // let material = new THREE.MeshPhongMaterial({
            //   color: "#013cff",
            //   opacity: 1,
            //   transparent: true,
            // });
            // let mesh = new THREE.Mesh(geometry, material);
            // mesh.position.x = 0;
            // mesh.position.y = 0;
            // mesh.position.z = 0;
            // mesh.scale.set(0.4, 0.4, 0.4);
            // // mesh.scale.set(1,1,2.5);
            // mesh.rotation.set(-1.54, 0, 0);

            scene.add(cube);
          },
          // called when loading is in progresses
          function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          // called when loading has errors
          function (error) {
            console.log("An error happened", error);
          }
        );

        // const loader = new GLTFLoader().setPath("/automobile/test-dome/");
        // loader.load(
        //   "Audi-R8.gltf",
        //   function (gltf) {
        //     console.log("gltf", gltf);

        //     //   材质
        //     console.log("gltf", detailsMaterial);

        //     // gltf.scene.children[3].material = detailsMaterial;
        //     // console.log("gltf.scene", gltf.scene);
        //     // gltf.scene.children[2].children[0].material = material;
        //     // gltf.scene.children[3].children[3].children[0].material = detailsMaterial;

        //     // const group = gltf.scene.getObjectByName("Car_Body");
        //     // console.log("group", group);
        //     // group.getObjectByName("Plane016").material = detailsMaterial;
        //     // group.getObjectByName("Plane016_1").material = detailsMaterial;

        //     // gltf.scene.getObjectByName("Front_Glass").material = material;
        //     // gltf.scene.getObjectByName("Front_Glass003").material = material;

        //     // 动画
        //     datas.animactionMixer = new THREE.AnimationMixer(gltf.scene);
        //     const animationClip = gltf.animations.find(
        //       (animationClip) => animationClip.name == "Driver_door"
        //     );
        //     datas.mixer = datas.animactionMixer.clipAction(animationClip);
        //     // datas.mixer.play();
        //     // datas.mixer.setLoop(1, 1);

        //     //   datas.animactionMixer.addEventListener( 'finished', function( e ) { console.log("finished", e)} )

        //     gltf.scene.traverse(function (child) {
        //       if (child.isMesh) {
        //         console.log("child", child);
        //         roughnessMipmapper.generateMipmaps(child.material);

        //         if (child.name == "Front_Glass" || child.name == 'Front_Glass003') {
        //           child.material = material;
        //         } else {
        //           child.material = detailsMaterial;
        //         }
        //       }
        //     });

        //     scene.add(gltf.scene);

        //     roughnessMipmapper.dispose();

        //     render();
        //   },

        //   (xhr) => {
        //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        //   },
        //   // called when loading has errors
        //   (error) => {
        //     console.log("An error happened", error);
        //   }
        // );
      });

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        render();
      }
      datas.clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);

        if (datas.animactionMixer) datas.animactionMixer.update(datas.clock.getDelta());
        stats.update();
        controls.update(); // required if damping enabled
        // datas.mixer.addEventListener("finished", function (e) {
        //   console.log("finished", e);
        // });
        render();
      }

      function render() {
        renderer.render(scene, camera);
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
