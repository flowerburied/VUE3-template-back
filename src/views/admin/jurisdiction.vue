<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" plain @click="addJur">添加权限</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        accordion
        draggable
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>

            <span>
              <span v-if="!data.moudleId">
                <el-button
                  type="success"
                  size="mini"
                  icon="el-icon-plus"
                  round
                  @click="append(data)"
                ></el-button>
                <!-- <a @click="append(data)"> 添加节点 </a> -->
              </span>
              <span style="padding: 20px">
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  round
                  @click="remove(node, data)"
                ></el-button>
              </span>

              <!-- <a @click="remove(node, data)"> 删除节点 </a> -->
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="添加权限">
      <el-form ref="fromname" :rules="rules" :model="form">
        <el-form-item label="权限名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addJurTrue('fromname')">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import api from "@/api/api";
export default {
  components: {},
  setup() {
    const { proxy } = getCurrentInstance(); //this
    const datas = reactive({
      defaultProps: {
        children: "children",
        label: "name",
      },
      data: [],
      page: 1,
      page_size: 999,

      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    });

    // const chData = toRefs(datas); // 扩展运算符用

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
          //   for (let i = 0; i < data.list.length; i++) {
          //     data.list[i].status = switchfun(data.list[i].status);
          //   }
          datas.data = data.list;

          //   const total = parseInt(data.count);
          //   // console.log("total",typeof(total))
          //   datas.total = total;
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const remove = (node, data) => {
      console.log("node", node);
      console.log("data", data);

      ElMessageBox.confirm("确认删除该权限吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // ElMessage({
          //   type: "success",
          //   message: "Delete completed",
          // });
          removeTrue(data);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };
    const removeTrue = async (data) => {
      try {
        let option = {};
        var res = null;
        if (data.moudleId) {
          option = {
            moudle: 13,
            node: 24,
            node_id: data.id,
          };

          res = await api.Admin.deleteNode(option);
        } else {
          option = {
            moudle: 13,
            node: 24,
            moudle_id: data.id,
          };

          res = await api.Admin.deleteMoudle(option);
        }

        console.log("res", res);
        const { code, message } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "删除成功",
            type: "success",
          });
        } else {
          ElMessage({
            showClose: false,
            message: message,
            type: "error",
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    };

    const append = (data) => {
      console.log("data", data);
      // const newChild = { id: 1, name: "testtest", children: [] };
      // if (!data.children) {
      //   data.children = [];
      // }
      // data.children.push(newChild);
      // datas.data = [...datas.data];
      ElMessageBox.prompt("请输入添加名称", "添加", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "请输入添加名称",
      })
        .then(({ value }) => {
          // ElMessage({
          //   type: "success",
          //   message: `Your email is:${value}`,
          // });
          appendTrue(value, data);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Input canceled",
          });
        });
    };
    const appendTrue = async (value, data) => {
      try {
        let option = {
          moudle: 13,
          node: 24,
          name: value,
          moudle_id: data.id,
        };
        const res = await api.Admin.setNode(option);

        console.log("res", res);
        const { code } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "添加成功",
            type: "success",
          });
          datas.dialogFormVisible = false;
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

    const addJur = () => {
      datas.dialogFormVisible = true;
    };

    const addJurTrue = (formName) => {
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          addFun();
          //  console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const addFun = async () => {
      try {
        let option = {
          moudle: 13,
          node: 156,
          name: datas.form.name,
        };
        const res = await api.Admin.setMoudle(option);

        console.log("res", res);
        const { code } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "添加成功",
            type: "success",
          });
          datas.dialogFormVisible = false;
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
      getlist();
    });

    return {
      ...toRefs(datas),
      remove,
      append,
      getlist,
      addJur,
      addJurTrue,
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
