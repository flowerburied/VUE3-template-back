<template>
  <router-view />
</template>
<script>
import $store from "./store/index";
export default {
  components: {},
  setup() {
    $store.dispatch("getJurisdiction");

    return {};
  },
};
</script>

<style lang="scss">
#app {
}
</style>
