<template>
  <svg>
    <use href="#ic-zan"></use>
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  setup() {
    //   获取当前svg目录所有为.svg结尾的文件
    const req = require.context(
      "../../assets/svg", //寻找指定目录文件
      false, //是否寻找指定目录文件的子文件
      /\.svg$/ //匹配后缀为svg的文件
    );
    // 解析获取的.svg文件的文件名称，并返回
    const requireAll = (requireContext) => {
      return requireContext.key().map(requireContext);
    };
    requireAll(req);
  },
};
</script>

<style lang="scss" scpoed></style>
