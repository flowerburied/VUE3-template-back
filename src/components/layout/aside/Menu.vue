<template>
  <el-sub-menu :index="item.path">
    <template #title>
      <i class="icon icon-size-21" :class=" item.meta && item.meta.icon"></i>
      <span>{{ item.meta && item.meta.title }}</span>
    </template>
    <template v-if="item.children.length">
      <template v-for="child in item.children" :key="child">
        <!-- 不存在子集的栏目 -->
        <el-menu-item v-if="!child.children" :index="child.path">
          <!-- <i class="icon icon-aside-home icon-size-21"></i> -->
          {{ child.meta && child.meta.title }}
        </el-menu-item>
        <!-- 存在子集的栏目 -->
        <mymenu :item="child" v-else></mymenu>
      </template>
    </template>
  </el-sub-menu>
</template>

<script>
export default {
  name: "mymenu",

  props: {
    item: {
      type: Object,
      // default: () => ({}), //默认值
      required: true, //是否必要
    },
  },
};
</script>
