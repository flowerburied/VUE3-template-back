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
      container: null,
      // scene: new THREE.Scene(),
      num: Math.PI,
      car: null,
      camera: null,
    });

    const { proxy } = getCurrentInstance();

    const init = () => {
      console.log("proxy", proxy);
      var scene = new THREE.Scene(); //创建实例

      //创建相机
      let width = window.innerWidth / 2;
      let Height = window.innerHeight / 2;
      var camera = new THREE.PerspectiveCamera(50, width / Height, 0.1, 50000);

      var renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器 https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer

      renderer.setClearColor(new THREE.Color("rgb(39, 174, 96)"));
      renderer.setSize(width, Height);

      var axes = new THREE.AxisHelper(40);
      scene.add(axes);

      const planeGeometry = new THREE.PlaneGeometry(60, 20);

      const planeMaterial = new THREE.MeshBasicMaterial({ color: "rgb(41, 128, 185)" });

      // 创建地面
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      // plane.rotation.x = 90.5 * Math.PI;
      plane.rotation.x = 15;
      plane.rotation.y = 0;
      plane.rotation.z = 0;

      scene.add(plane);

      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;

      camera.lookAt(scene.position);

      datas.container.appendChild(renderer.domElement); //输出至画板

      renderer.render(scene, camera);
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
