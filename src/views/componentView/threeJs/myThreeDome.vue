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
// import { Camera } from "@element-plus/icons";
import Stats from "stats-js";

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
      var camera = new THREE.PerspectiveCamera(75, width / Height, 0.1, 500000);
      // 设置渲染器
      var renderer = new THREE.WebGLRenderer({ antialias: true }); //创建渲染器 https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer
      renderer.setClearColor(0xffffff);
      renderer.setSize(width, Height);
      datas.container.appendChild(renderer.domElement); //输出至画板

      // 坐标轴
      var axes = new THREE.AxesHelper(40);
      scene.add(axes);

      // 光照
      const light = new THREE.AmbientLight(0x404040, 10); // 全局光
      scene.add(light);

      // 生成模型

      // 动画
      const stats = new Stats();
      stats.showPanel(0);
      datas.container.appendChild(stats.dom);

      //
      const animactionMixer = new THREE.AnimationMixer(scene);

      // 生成模型

      const loader = new GLTFLoader();
      loader.load(
        "/automobile/Soldier.glb",
        (glft) => {
          // console.log("glft", glft);
          scene.add(glft.scene);
          const animationClip = glft.animations.find(
            (animationClip) => animationClip.name == "Run"
          );
          console.log("animationClip", animationClip);
          const action = animactionMixer.clipAction(animationClip);
          action.play();
        },
        (xhr) => {
          console.log("xhr", (xhr.loaded / xhr.total) * 100 + "% loader");
        },
        (error) => {
          console.log("error", error);
        }
      );

      //设置自由相机
      const controls = new OrbitControls(camera, renderer.domElement);
      camera.position.set(0, 3, 2);
      controls.update();

      const clock = new THREE.Clock();
      // console.log("clock", clock.getDelta());
      // animactionMixer.update(clock.getDelta());
      function animate() {
        stats.begin();
        requestAnimationFrame(animate);
        controls.update();

        // cude.rotation.y += 0.01; //旋转
        renderer.render(scene, camera);

        if (animactionMixer) {
          animactionMixer.update(clock.getDelta());
        }
        // console.log("clock", clock.getDelta());

        stats.end();
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
