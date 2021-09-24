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
      background-color="#282c34"
      text-color="#ffffff"
    >
      <template v-for="item in routers" :key="item">
        <!-- 一级菜单 -->
        <template v-if="!item.hidden">
          <el-menu-item :index="item.path" v-if="item.children.length == 1">
            <!-- <i class="el-icon-menu"></i> -->
            <!-- <i class="icon icon-size-21" :class="child.meta && child.meta.icon"></i> -->

            <template #title>
              <div class="menu-class">
                <svg-icon
                  :iconName="item.meta && item.meta.icon"
                  className="aside-svg"
                ></svg-icon>
                {{ item.meta && item.meta.title }}
              </div>
            </template>
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
    // 路由
    const { options } = useRouter();
    const routers = options.routes;
    // const { getRoutes } = useRouter();
    // const routers = getRoutes();
    // console.log("routers", routers);
    // 数据
    const data = reactive({
      selectedKeys: localStorage.getItem("selectedKeys"),
      openedsKey: localStorage.getItem("openedsKey")
        ? [localStorage.getItem("openedsKey")]
        : [],
    });
    const from = toRefs(data);
    // console.log("routers", routers);
    // console.log("data", from.options.value);
    // 打开菜单
    const handleOpen = (key, keyPath) => {
      console.log("handleOpen", key, keyPath);
      localStorage.setItem("openedsKey", key);
      data.openedsKey = key;
    };
    // 选择菜单
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

<style lang="scss">
.menu-class {
  display: flex;
  align-items: center;
}
// 更改选中颜色
.el-menu-item.is-active {
  background: #1890ff !important;
  color: #ffffff;
}
</style>
