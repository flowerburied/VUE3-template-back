<template>
  <div class="Header">
    <expand style="width: 20px; height: 20px; margin-right: 8px" />
    <el-dropdown trigger="click">
      <el-avatar :size="35" :src="headImg" @error="errorHandler">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      <!-- <img :src="boxlist" > -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-user">用户名称</el-dropdown-item>
          <el-dropdown-item icon="el-icon-map-location">中文</el-dropdown-item>

          <el-dropdown-item icon="el-icon-arrow-right">{{ $t("header_menu.logout")}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { Apple, Expand } from "@element-plus/icons";
export default {
  name: "Header",
  components: {
    Apple,
    Expand,
    // delete,
  },
  setup() {
    const fromConfig = reactive({
      headImg: require("@/assets/template-img/head.png"),
    });
    const from = toRefs(fromConfig);
    const errorHandler = () => true;
    return { ...from, errorHandler };
  },
};
</script>
<style lang="scss">
.Header {
  height: 100%;
  // padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
