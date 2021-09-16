<template>
  <el-sub-menu :index="item.path">
    <template #title>
      <!-- <i class="icon icon-size-21" :class=" item.meta && item.meta.icon"></i> -->
      <div class="menu-class">
        <SvgIcon :iconName="item.meta && item.meta.icon" className="aside-svg"></SvgIcon>
        <span>{{ item.meta && item.meta.title }}</span>
      </div>
    </template>
    <template v-if="item.children.length">
      <template v-for="child in item.children" :key="child">
        <!-- 不存在子集的栏目 -->
        <el-menu-item v-if="!child.children" :index="child.path">
          <div class="menu-class">
            <!-- <i class="icon icon-aside-home icon-size-21"></i> -->
            {{ child.meta && child.meta.title }}
          </div>
        </el-menu-item>
        <!-- 存在子集的栏目 -->
        <mymenu :item="child" v-else></mymenu>
      </template>
    </template>
  </el-sub-menu>
</template>

<script>
import SvgIcon from "@/components/Svgicon";
export default {
  name: "mymenu",
  components: {
    SvgIcon,
  },
  props: {
    item: {
      type: Object,
      // default: () => ({}), //默认值
      required: true, //是否必要
    },
  },
};
</script>

<style lang="scss">
.menu-class {
  display: flex;
  align-items: center;
}
</style>
