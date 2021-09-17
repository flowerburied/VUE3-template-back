<template>
  <div class="login">登录</div>
</template>

<script>
export default {
  // name: "login",
  components: {},
  setup() {
    const promise_1 = () => {
      return new Promise((resolve, reject) => {
        resolve("aaa");
      });
    };

    promise_1().then((res) => {
      console.log("res", res);
    });
  },
};
</script>
