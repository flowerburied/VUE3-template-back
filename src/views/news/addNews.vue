<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :rules="rules"
        ref="fromname"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="标题" prop="account">
          <el-input v-model="content" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInline.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- onSubmit('fromname') -->
          <el-button type="primary" @click="getHTML">添加管理员</el-button>
        </el-form-item>
      </el-form>
      <QuillEditor
      ref="QuillEditor"
      :content="contentQuillEditor"
        v-model="contentQuillEditor"
        toolbar="full"
        
        :options="editorOption"
      />
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import api from "@/api/api";
// 富文本
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  setup() {
    const { proxy } = getCurrentInstance(); //this
    const datas = reactive({
      formInline: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      contentQuillEditor: "",
      editorOption: {
        placeholder: "Compose an epic...",
        readOnly: false,
        theme: "snow",
      },
      QuillEditor:null
    });

    const onSubmit = (formName) => {
      //   console.log("getCheckedNodes", proxy.$refs.tree.getCheckedNodes());
      console.log("getCheckedKeys", proxy.$refs.tree.getCheckedNodes());
      //   console.log("proxy", proxy);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          const getArray = proxy.$refs.tree.getCheckedNodes();
          if (getArray.length != 0) {
            // console.log("ubmit!!");
            let handleArray = [];
            for (let c = 0; c < datas.jurList.length; c++) {
              let option = datas.jurList[c];
              for (let i = 0; i < getArray.length; i++) {
                if (getArray[i].moudleId == option.id) {
                  option.path.push(getArray[i].id);
                }
              }
              if (option.path.length != 0) {
                handleArray.push(option);
              }
            }
            console.log("handleArray", handleArray);

            addAdmin(handleArray);
          } else {
            // console.log("error submit!!");
            ElMessage({
              showClose: false,
              message: "请选择一个权限",
              type: "error",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const addAdmin = async (handleArray) => {
      try {
        let option = {
          moudle: 72,
          node: 152,
          account: datas.formInline.account,
          password: datas.formInline.password,
          jurisdiction: JSON.stringify(handleArray),
        };
        const res = await api.Admin.setAdminUser(option);

        console.log("res", res);
        const { code } = res;
        if (code == 0) {
          ElMessage({
            showClose: false,
            message: "添加成功",
            type: "success",
          });
          router.go(-1);
        } else {
          ElMessage({
            showClose: false,
            message: "添加失败",
            type: "error",
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const getHTML = () => {
      console.log("datas.content", datas.QuillEditor.getHTML());
    };

  

    onMounted(() => {});

    return {
      ...toRefs(datas),
      onSubmit,
      getHTML,

    };
  },
};
</script>

<style lang="scss">
.el-tree-node__content {
  padding: 5px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  //   color: #fff;
}
</style>
