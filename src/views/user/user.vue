<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="昵称">
          <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formInline.phone" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="formInline.randid" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" plain @click="seeDefault">查看详情</el-button>
        </el-form-item>
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
        <el-table-column property="nickname" label="昵称"> </el-table-column>
        <el-table-column property="phone" label="账号"> </el-table-column>
        <el-table-column property="randId" label="用户ID"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-tooltip :content="scope.row.status" placement="top">
              <el-switch
                @change="changeswitch(scope.row)"
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="正常"
                inactive-value="锁定"
              >
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <!-- slot-scop 改成 v-slot！！！-->
          <template v-slot="scope">
            {{ getTrueTime1(scope.row.lastTime) }}
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间">
          <!-- slot-scop 改成 v-slot！！！-->
          <template v-slot="scope">
            {{ getTrueTime1(scope.row.loginTime) }}
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogTableVisible">
        <el-descriptions title="用户信息">
          <el-descriptions-item label="用户名">{{
            currentRow.nickname
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            currentRow.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="用户ID">{{
            currentRow.userId
          }}</el-descriptions-item>
          <el-descriptions-item label="状态">{{
            currentRow.status
          }}</el-descriptions-item>
          <el-descriptions-item label="是否实名">{{
            currentRow.realname
          }}</el-descriptions-item>
          <el-descriptions-item label="财富值">{{
            currentRow.wealthvalue
          }}</el-descriptions-item>
          <el-descriptions-item label="魅力值">{{
            currentRow.charmvalue
          }}</el-descriptions-item>
          <el-descriptions-item label="账户余额">{{
            currentRow.balance
          }}</el-descriptions-item>
        </el-descriptions>
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
import { onMounted, reactive, toRefs } from "vue";
import getTrueTime from "@/utils/getTime";
import api from "@/api/api";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index";
export default {
  components: {},
  setup() {
    const datas = reactive({
      formInline: {
        nickname: "",
        phone: "",
        randid: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
        const res = await api.user.getMemberlist(option);
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          for (let i = 0; i < data.list.length; i++) {
            data.list[i].status = switchfun(data.list[i].status);
            data.list[i].realname = switchrealname(data.list[i].realname);
          }
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
      if (
        !datas.formInline.nickname &&
        !datas.formInline.phone &&
        !datas.formInline.randid
      ) {
        // console.log("you");
        getlist();
      } else {
        // console.log("wu");
        onSubmitTrue();
      }
    };

    const onSubmitTrue = async () => {
      try {
        let option = null;
        if (datas.formInline.randid) {
          option = {
            page: datas.page,
            page_size: datas.page_size,
            nickname: datas.formInline.nickname,
            phone: datas.formInline.phone,
            randid: datas.formInline.randid,
          };
        } else {
          option = {
            page: datas.page,
            page_size: datas.page_size,
            nickname: datas.formInline.nickname,
            phone: datas.formInline.phone,
            randid: 0,
          };
        }

        const res = await api.user.UserSearch(option);
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          for (let i = 0; i < data.list.length; i++) {
            data.list[i].status = switchfun(data.list[i].status);
            data.list[i].realname = switchrealname(data.list[i].realname);
          }
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
      if (val == 1) {
        state = "正常";
      } else {
        state = "锁定";
      }
      return state;
    };

    const switchrealname = (val) => {
      let state = "";
      if (val == 1) {
        state = "已实名";
      } else {
        state = "未实名";
      }
      return state;
    };

    const addAdmin = () => {
      router.push({ path: "/addAdmin" });
    };

    const delAdmin = () => {
      if (datas.currentRow) {
        ElMessageBox.alert("确认删除该管理员？", "删除管理员", {
          confirmButtonText: "确定",
          callback: () => {
            delAdminTrue();
          },
        });
      } else {
        ElMessage({
          showClose: false,
          message: "请选择一个管理员",
          type: "error",
        });
      }
    };
    const delAdminTrue = async () => {
      try {
        let option = {
          page: datas.page,
          page_size: datas.page_size,
        };
        const res = await api.Admin.getAdminUserList(option);
        const { data, code } = res;
        if (code == 0) {
          for (let i = 0; i < data.list.length; i++) {
            data.list[i].status = switchfun(data.list[i].status);
          }
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

    onMounted(() => {
      getlist();
    });

    return {
      ...chData,
      onSubmit,
      handleSizeChange,
      handleCurrentChange,
      getlist,
      getTrueTime1,
      changeswitch,
      switchfun,
      addAdmin,
      handletChange,
      delAdmin,
      seeDefault,
    };
  },
};
</script>
