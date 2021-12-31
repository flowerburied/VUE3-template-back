<template>
  <div>
    <el-card>
      <!-- <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" plain @click="adopt">通过</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="danger" plain @click="refuse">拒绝</el-button>
        </el-form-item> -->
      </el-form>
      <el-table
        border
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        @current-change="handletChange"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="name" label="支付宝账号"> </el-table-column>
        <el-table-column property="account" label="支付宝名称"> </el-table-column>
        <el-table-column property="money" label="提现金额"> </el-table-column>

        <!-- <el-table-column property="price" label="价格"> </el-table-column> -->

        <el-table-column label="申请状态">
          <template v-slot="scope">
            {{ switchfun(scope.row.status) }}
          </template>
        </el-table-column>

        <el-table-column label="渠道">
          <template v-slot="scope">
            {{ switchfun1(scope.row.type) }}
          </template>
        </el-table-column>

        <el-table-column label="创建日期">
          <!-- slot-scop 改成 v-slot！！！-->
          <template v-slot="scope">
            {{ getTrueTime1(scope.row.createTime) }}
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogTableVisible">
        <el-form :model="form" :rules="rules" ref="formInline">
          <el-form-item label="拒绝原因" prop="reason">
            <el-input :rows="2" type="textarea" v-model="form.reason"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="refuseGuild('formInline')">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import getTrueTime from "@/utils/getTime";
import api from "@/api/api";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index";
export default {
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const datas = reactive({
      formInline: { name: "" },
      form: {
        reason: "",
      },
      rules: {
        reason: [{ required: true, message: "请输入拒绝原因", trigger: "blur" }],
      },
      tableData: [],
      currentRow: null,
      total: 1,
      page: 1,
      page_size: 100,
      testval: "正常",
      dialogTableVisible: false,
    });

    const chData = toRefs(datas); // 扩展运算符用

    const getlist = async () => {
      try {
        let option = {
          page: datas.page,
          page_size: datas.page_size,
        };
        const res = await api.Withdrawal.WithdrawaList(option);
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          datas.tableData = data.list;
          // console.log("data.count", data.count);
          const total = parseInt(data.count);
          // console.log("total",typeof(total))
          datas.total = total;
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const onSubmit = async () => {
      if (!datas.formInline.name) {
        // console.log("you");
        getlist();
      } else {
        // console.log("wu");
        onSubmitTrue();
      }
    };

    const onSubmitTrue = async () => {
      try {
        let option = {
          page: datas.page,
          page_size: datas.page_size,
          name: datas.formInline.name,
        };

        const res = await api.gift.GiftSearch(option);
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          datas.tableData = data.list;
          // console.log("data.count", data.count);
          const total = parseInt(data.count);
          // console.log("total",typeof(total))
          datas.total = total;
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`);
      datas.page_size = val;
      getlist();
    };
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`);
      datas.page = val;
      getlist();
    };
    const getTrueTime1 = (val) => {
      return getTrueTime(val);
    };

    const changeswitch = async (val) => {
      console.log("changeswitch", val);

      try {
        let option = {};
        if (val.status == "正常") {
          option = {
            moudle: 84,
            node: 172,
            user_id: val.userId,
            status: 1,
          };
        } else {
          option = {
            moudle: 84,
            node: 172,
            user_id: val.userId,
            status: 2,
          };
        }

        const res = await api.user.setMemberStatus(option);

        console.log("res", res);
        const { code, message } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "设置成功",
            type: "success",
          });
          datas.dialogFormVisible = false;
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

    const switchfun = (val) => {
      let state = "";
      if (val == 0) {
        state = "申请中";
      } else if (val == 1) {
        state = "通过";
      } else if (val == 2) {
        state = "拒绝";
      }
      return state;
    };
    const switchfun1 = (val) => {
      let state = "";
      if (val == 1) {
        state = "支付宝";
      } else if (val == 2) {
        state = "微信";
      }
      return state;
    };

    const addlist = () => {
      router.push({ path: "/addNews" });
    };

    const del = () => {
      if (datas.currentRow) {
        ElMessageBox.alert("确认删除？", "删除", {
          confirmButtonText: "确定",
          callback: () => {
            delTrue();
          },
        });
      } else {
        ElMessage({
          showClose: false,
          message: "请选择一个",
          type: "error",
        });
      }
    };
    const delTrue = async () => {
      try {
        let option = {
          moudle: 87,
          node: 179,
          id: datas.currentRow.id,
        };
        const res = await api.gift.deleteGift(option);
        const { message, code } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "设置成功",
            type: "success",
          });
          // datas.dialogFormVisible = false;
        } else {
          ElMessage({
            showClose: false,
            message: message,
            type: "error",
          });
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const handletChange = (val) => {
      datas.currentRow = val;
    };

    const seeDefault = () => {
      console.log("datas.currentRow!", datas.currentRow);
      if (datas.currentRow) {
        datas.dialogTableVisible = true;
      } else {
        ElMessage({
          showClose: false,
          message: "请选择一个用户",
          type: "error",
        });
      }
    };

    const handlePictureCardPreview = (response, file, fileList) => {
      console.log("file.url", fileList);
      datas.form.dialogImageUrl = fileList;
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
      datas.form.dialogImageUrl = fileList;
    };

    const handlefike = (response, file, fileList) => {
      console.log("file.url", fileList);
      datas.form.fileList = fileList;
    };
    const handleRemovefile = (file, fileList) => {
      console.log(file, fileList);
      datas.form.fileList = fileList;
    };

    const refuseGuild = (formName) => {
      // console.log("formName", formName);
      console.log("datas.dialogImageUrl", datas.form.dialogImageUrl);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("submit!!");
          refuseGuildTrue();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const refuseGuildTrue = async () => {
      try {
        let option = {
          moudle: 88,
          node: 187,
          id: datas.currentRow.id,
          reason: datas.form.reason,
        };

        // console.log("option", option);
        const res = await api.Guild.RefuseUnionApply(option);
        const { code, message } = res;
        console.log("res", res);
        if (code == 0) {
          ElMessage({
            showClose: false,
            message: "成功",
            type: "success",
          });
          getlist();
          datas.dialogTableVisible = false;
          resetForm();
        } else {
          ElMessage({
            showClose: false,
            message: message,
            type: "error",
          });
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const refuse = () => {
      if (datas.currentRow) {
        datas.dialogTableVisible = true;
      } else {
        ElMessage({
          showClose: false,
          message: "请选择一个",
          type: "error",
        });
      }
    };

    const adopt = () => {
      if (datas.currentRow) {
        ElMessageBox.alert("是否通过申请", "申请", {
          confirmButtonText: "确定",
          callback: () => {
            adoptTrue();
          },
        });
      } else {
        ElMessage({
          showClose: false,
          message: "请选择一个",
          type: "error",
        });
      }
    };
    const adoptTrue = async () => {
      try {
        let option = {
          moudle: 91,
          node: 190,
          id: datas.currentRow.id,
        };
        const res = await api.Withdrawal.ConfirmAliPay(option);
        const { message, code } = res;
        if (code == 0) {
          getlist();
          ElMessage({
            showClose: false,
            message: "成功",
            type: "success",
          });
          // datas.dialogFormVisible = false;
        } else {
          ElMessage({
            showClose: false,
            message: message,
            type: "error",
          });
        }
      } catch (err) {
        console.log("err!", err);
      }
    };
    const resetForm = () => {
      proxy.$refs["formInline"].resetFields();
    };

    onMounted(() => {
      getlist();
    });

    return {
      ...chData,
      refuseGuild,
      handlefike,
      handleRemovefile,
      onSubmit,
      handleSizeChange,
      handleCurrentChange,
      getlist,
      getTrueTime1,
      changeswitch,
      switchfun,
      addlist,
      handletChange,
      del,
      seeDefault,
      handlePictureCardPreview,
      handleRemove,
      adopt,
      refuse,
      switchfun1,
    };
  },
};
</script>
