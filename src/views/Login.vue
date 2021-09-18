<template>
  <div class="login">
    <div class="login-img">
      <el-image :src="src">
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
      </el-image>
    </div>

    <div class="login-con">
      <div class="login-con-form">
        <!-- <div>
          {{ form.account }}
          **
          {{ input }}
        </div> -->

        <el-form ref="fromname" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('fromname')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance } from "vue";
// import {replace} from "vue-router"
import api from "../api/api";
export default {
  name: "login",
  components: {},
  setup() {
    const fromConfig = reactive({
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    });
    const from11 = toRefs(fromConfig);

    const input = ref("434");

    // const promise_1 = () => {
    //   return new Promise((resolve, reject) => {
    //     resolve("aaa");
    //   });
    // };
    const src = ref(
      "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    );

    // promise_1().then((res) => {
    //   console.log("res", res);
    // });

    const { proxy } = getCurrentInstance();

    const onSubmit = (formName) => {
      console.log("proxy", proxy);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const login = async () => {
      try {
        let option = {
          account: fromConfig.form.account,
          password: fromConfig.form.password,
        };
        console.log("option", option);
        const res = await api.template.login(option);

        console.log("res", res);
        // replace({
        //   name: "/",
        // });
      } catch (err) {
        console.log("err", err);
      }
    };

    return {
      // form,
      ...from11,
      onSubmit,
      login,
      src,
      input,
    };
  },
};
</script>

<style lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  .login-img {
    position: fixed;
    width: 100%;
    height: 100vh;
  }
  .login-con {
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-con-form {
      padding: 40px 45px 0 0;
      background: #fff;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
