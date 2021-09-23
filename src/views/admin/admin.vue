<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" plain @click="addAdmin">新建管理员</el-button>
        </el-form-item>
      </el-form>
      <el-table
        border
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="account" label="账号"> </el-table-column>
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
            {{ getTrueTime1(scope.row.addTime) }}
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间">
          <!-- slot-scop 改成 v-slot！！！-->
          <template v-slot="scope">
            {{ getTrueTime1(scope.row.loginTime) }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 100, 200, 300, 400]"
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
import { ElMessage } from "element-plus";
import router from "@/router/index"
export default {
  components: {},
  setup() {
    const datas = reactive({
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      currentRow: null,
      total: 1,
      page: 1,
      page_size: 5,
      testval: "正常",
    });

    const chData = toRefs(datas); // 扩展运算符用

    const getlist = async () => {
      // let option = {
      //   page: 1,
      //   page_size: 5,
      // };
      // api.Admin.getAdminUserList(option).then((res) => {
      //   console.log("res", res.data.count);
      //   const getlists = res.data.list;
      //   datas.tableData = getlists;
      //   console.log("datas.tableData ", datas.tableData);
      // });
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

    const onSubmit = () => {
      console.log("submit!");
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
            moudle: 1,
            node: 2,
            admin_id: val.adminId,
            status: 1,
          };
        } else {
          option = {
            moudle: 1,
            node: 2,
            admin_id: val.adminId,
            status: 2,
          };
        }

        const res = await api.Admin.setAdminUserStatus(option);

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
    const addAdmin=()=>{
       router.push({ path: "/addAdmin" });
    }

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
      addAdmin
    };
  },
};
</script>
