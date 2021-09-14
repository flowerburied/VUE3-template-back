<template>
  <div class="Aside">
    <el-menu
      @select="handleSelect"
      :default-active="selectedKeys"
      :default-openeds="openedsKey"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      router
      unique-opened
    >
      <template v-for="item in routers" :key="item">
        <!-- 一级菜单 -->
        <template v-if="!item.hidden">
          <el-menu-item :index="item.path" v-if="!item.children">
            <i class="el-icon-menu"></i>
            <template #title> {{ child.meta && child.meta.title }}</template>
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
      selectedKeys: "",
      openedsKey: [],
    });
    const from = toRefs(data);
    console.log("routers", routers);
    console.log("data", from.options.value);
    const handleOpen = (key, keyPath) => {
      console.log("handleOpen", key, keyPath);
      localStorage.setItem("openedsKey", key);
      data.openedsKey = keyPath;
    };

    const handleSelect = (key, keyPath) => {
      //   console.log("handleSelect", key, keyPath);
      localStorage.setItem("selectedKeys", key);
      data.selectedKeys = key;
      console.log("handleSelect", data, keyPath);
    };
    return {
      ...from,
      routers,
      data,
      handleOpen,
      handleSelect,
    };
  },
});
</script>
