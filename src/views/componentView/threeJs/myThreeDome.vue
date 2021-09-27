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
      renderer.setSize(width, Height);
      datas.container.appendChild(renderer.domElement); //输出至画板

      // 坐标轴
      var axes = new THREE.AxesHelper(40);
      scene.add(axes);
      // 生成模型
      const geometry = new THREE.BoxGeometry();
      const meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cude = new THREE.Mesh(geometry, meterial);
      scene.add(cude);

      const geometry1 = new THREE.ConeGeometry(5, 20, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const cone = new THREE.Mesh(geometry1, material);
      scene.add(cone);
      // 相机坐标
      camera.position.x = 1;
      camera.position.y = 1;
      camera.position.z = 5;

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
