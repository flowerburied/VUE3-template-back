<template>
  <div class="myThreeDome">
    <el-card>
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
import { Camera } from "@element-plus/icons";

// import { ModelGltf } from "vue-3d-model";
export default {
  components: {
    // ModelGltf,
  },
  // mounted() {
  //   let test = this.$refs.container;
  //   console.log("test", test);
  // },
  setup() {
    const datas = reactive({
      container: null, //DOM对象
    });

    const { proxy } = getCurrentInstance();

    const init = () => {
      console.log("proxy", proxy);
      var scene = new THREE.Scene(); //创建实例

      //创建相机
      let width = window.innerWidth / 2;
      let Height = window.innerHeight / 2;
      var camera = new THREE.PerspectiveCamera(75, width / Height, 0.1, 50000);
      // 设置渲染器
      var renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器 https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
      renderer.setClearColor(0xffffff);
      renderer.setSize(width, Height);
      datas.container.appendChild(renderer.domElement); //输出至画板

      // 坐标轴
      var axes = new THREE.AxesHelper(40);
      scene.add(axes);

      // 光照
      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);
      // 生成模型

      // 生成模型
      const geometry = new THREE.BoxGeometry();
      const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cude = new THREE.Mesh(geometry, meterial);
      scene.add(cude);
      // const loader = new GLTFLoader();
      // loader.load(
      //   "/automobile/scene.gltf",
      //   (glft) => {
      //     scene.add(glft.scene);
      //     renderer.render(scene, camera);
      //   },
      //   (xhr) => {
      //     console.log("xhr", (xhr.loaded / xhr.total) * 100 + "% loader");
      //   },
      //   (error) => {
      //     console.log("error", error);
      //   }
      // );

      //键盘控制相机移动
      document.onkeydown = function (event) {
        if (event.altKey == false) {
          //没有按下alt键
          switch (
            event.key // 获取当前按下键盘键的编码
          ) {
            //wsad移动
            case "w":
              camera.position.z -= 0.5;
              break;
            case "s":
              camera.position.z += 0.5;
              break;
            case "a":
              camera.position.x -= 0.5;
              break;
            case "d":
              camera.position.x += 0.5;
              break;
          }
        } else {
          //按住alt键
          switch (
            event.keyCode // 获取当前按下键盘键的编码
          ) {
            //相机绕轴旋转
            case 87:
              camera.rotation.z -= 0.5;
              break;
            case 83:
              camera.rotation.z += 0.5;
              break;
            case 65:
              camera.rotation.x -= 0.5;
              break;
            case 68:
              camera.rotation.x += 0.5;
              break;
          }
        }
      };

      // 相机坐标
      camera.position.x = -2;
      camera.position.y = 1;
      camera.position.z = 8;

      function animate() {
        // cude.rotation.y += 0.01; //旋转
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      // 开始动画
      animate();
    };

    onMounted(() => {
      init();
    });

    return {
      ...toRefs(datas),
    };
  },
};
</script>

<style lang="scss">
#container {
  /* height: 400px; */
}
</style>
