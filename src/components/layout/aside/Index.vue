<template>
  <div class="Aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in routers" :key="item">
        <!-- 一级菜单 -->
        <template v-if="!item.hidden">
          <el-menu-item :route="item.path" :index="item.path" v-if="!item.children">
            <i class="el-icon-menu"></i>
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
          <Menu :item="item" v-else></Menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import Menu from "@/components/layout/aside/Menu";
export default defineComponent({
  components: {
    Menu,
  },
  setup() {
    // console.log("useRoute", useRoute());

    const { options } = useRouter();
    const routers = options.routes;

    const data = reactive({
      options: options.routes,
    });
    const from = toRefs(data);
    console.log("routers", routers);
    console.log("data", from.options.value);
    const handleOpen = (key, keyPath) => {
      console.log("handleOpen", key, keyPath);
    };

    return {
      ...from,
      routers,
      data,
      handleOpen,
    };
  },
});
</script>
