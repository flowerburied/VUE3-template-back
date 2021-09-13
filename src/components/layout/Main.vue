<template>
  <router-view />
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
