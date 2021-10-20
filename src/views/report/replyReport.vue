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
        <el-form-item label="账号" prop="account">
          <el-input v-model="formInline.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formInline.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('fromname')">添加管理员</el-button>
        </el-form-item>
      </el-form>

      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        show-checkbox
        ref="tree"
      >
        <template #default="{ node }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import router from "@/router/index";
import api from "@/api/api";
export default {
  components: {},
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
      defaultProps: {
        children: "children",
        label: "name",
      },
      data: [],
      page: 1,
      page_size: 999,

      jurList: [
        //权限列表
        {
          path: [],
          id: "72", //管理员管理
        },
        {
          path: [],
          id: "84", //用户管理
        },
      ],
    });
    const getlist = async () => {
      try {
        let option = {
          page: datas.page,
          page_size: datas.page_size,
        };
        const res = await api.Admin.getJurisdictionList(option);
        const { data, code } = res;
        if (code == 0) {
          console.log("data.count", data);
          datas.data = data.list;
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

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

    onMounted(() => {
    //   getlist();
    });

    return {
      ...toRefs(datas),
      onSubmit,
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
