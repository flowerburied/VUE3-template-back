<template>
  <div class="Header">
    <expand style="width: 20px; height: 20px; margin-right: 8px" />

    <apple style="width: 1em; height: 1em; " />
  </div>
</template>

<script>
import { Apple,Expand } from "@element-plus/icons";
export default {
  name: "Header",

  components: {
    Apple,
    Expand
    // delete,
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
