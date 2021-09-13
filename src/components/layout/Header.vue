<template>
  <div class="Header">
    <div class="Header-left">
      <expand style="width: 20px; height: 20px; margin-right: 8px" />
    </div>
    <div class="Header-right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="changeLang(item.value)"
              v-for="item in globalization"
              :key="item.value"
              >{{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- @click="getfun" -->

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
            <!-- <el-dropdown-item icon="el-icon-map-location">中文</el-dropdown-item> -->

            <el-dropdown-item icon="el-icon-arrow-right">{{
              $t("header_menu.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
import { Expand } from "@element-plus/icons";
import api from "../../api/api.js";
export default {
  name: "Header",
  components: {
    Expand,
    // delete,
  },
  setup() {
    const fromConfig = reactive({
      headImg: require("@/assets/template-img/head.png"),
      globalization: [
        { name: "中文", value: "zhCn" },
        { name: "english", value: "en" },
      ],
    });
    const from = toRefs(fromConfig);
    const errorHandler = () => true;

    const getfun = async () => {
      try {
        let option = {
          page: 1,
          size: 1,
        };
        const res = api.template.getPlaceList(option);
        console.log("res", res);
      } catch (err) {
        console.log("err", err);
      }
    };
    const { proxy } = getCurrentInstance();
    // proxy代表vue2的this
    const changeLang = (lang) => {
      console.log("proxy", proxy);
      proxy.$emit("toggleLang", lang);
      // this.$emit("toggleLang", lang);
    };

    return { ...from, errorHandler, getfun, changeLang };
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
  .Header-right {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
</style>
