<template>
  <el-config-provider :locale="locale">
    <!-- <div @click="toggleLang('zhCn')">zhCn</div>
    <div @click="toggleLang('en')">en</div> -->
    <el-container class="container">
      <el-aside class="hidden-xs-only" width="200px"> <Aside></Aside></el-aside>
      <el-container>
        <el-header> <Header @toggleLang="toggleLang"></Header></el-header>
        <el-main> <Main></Main></el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import Aside from "@/components/layout/aside/Index";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
// 国际化
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useI18n } from "vue-i18n";
export default {
  name: "layout",
  components: {
    Aside,
    Header,
    Main,
  },
  setup() {
    // 扩展语言
    const { locale } = useI18n({ useScope: "global" });
    const layoutList = reactive({
      zhCn: zhCn,
      en: en,
      locale: en,
    });
    const from = toRefs(layoutList);

    const toggleLang = (lang) => {
    
      locale.value = lang;
      if (lang == "zhCn") {
        const temp = from.zhCn.value;
        from.locale.value = temp;
      } else {
        const temp = from.en.value;
        from.locale.value = temp;
      }
      console.log("from.locale", from.locale);
    };

    return {
      ...from,
      // locale: zhCn,
      toggleLang,
    };
  },
};
</script>

<style lang="scss">
// .layout{
//     height: 100%;
// }
.container {
  height: 100vh;
}
// Container 布局容器
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
