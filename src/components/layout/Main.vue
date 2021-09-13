<template>
  <div class="Main">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "Main",
  components: {},
  setup() {
    const state = reactive({
      value1: [],
    });

    return { ...toRefs(state) };
  },
};
</script>
