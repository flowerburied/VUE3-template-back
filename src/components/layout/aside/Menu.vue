<template>
  <el-sub-menu :route="item.path" :index="item.path">
    <template #title>
      <span>{{ item.meta && item.meta.title }}</span>
    </template>
    <template v-if="item.children.length">
      <template v-for="child in item.children" :key="child">
        <!-- 不存在子集的栏目 -->
        <el-menu-item v-if="!child.children" :route="child.path" :index="child.path">{{
          child.meta.title
        }}</el-menu-item>
        <!-- 存在子集的栏目 -->
        <Menu :item="child" v-else></Menu>
      </template>
    </template>
  </el-sub-menu>
</template>

<script>
export default {
  name: "menu",

  props: {
    item: {
      type: Object,
      default: () => ({}), //默认值
      required: true, //是否必要
    },
  },
};
</script>
