<template>

  <el-container class="container">
    <el-aside class="hidden-xs-only" width="200px"> <Aside></Aside></el-aside>
    <el-container>
      <el-header> <Header></Header></el-header>
      <el-main> <Main></Main></el-main>
    </el-container>
  </el-container>

</template>

<script>
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";

export default {
  name: "layout",
  components: {
    Aside,
    Header,
    Main,
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
