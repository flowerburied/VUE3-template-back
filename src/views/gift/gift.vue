<template>
  <div>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" plain @click="dialogTableVisible = true"
            >添加信息</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="danger" plain @click="del">删除</el-button>
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
        <el-table-column property="name" label="名称"> </el-table-column>
        <!-- <el-table-column property="price" label="价格"> </el-table-column> -->
        <el-table-column label="价格">
          <template v-slot="scope">
            {{ scope.row.price / 100 }}
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template v-slot="scope">
            {{ switchfun(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template v-slot="scope">
            <el-image
              fit="scale-down"
              style="width: 100px; height: 100px"
              :src="scope.row.cover"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <!-- slot-scop 改成 v-slot！！！-->
          <template v-slot="scope">
            {{ getTrueTime1(scope.row.addTime) }}
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogTableVisible">
        <el-form :model="form" :rules="rules" ref="formInline">
          <el-form-item label="礼物名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="礼物价格" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="礼物类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择活动区域">
              <el-option label="普通礼物" value="1"></el-option>
              <el-option label="亲密值礼物" value="2"></el-option>
              <el-option label="cp礼物" value="3"></el-option>
              <el-option label="头像框" value="4"></el-option>
              <el-option label="房间背景" value="5"></el-option>
              <el-option label="挚友" value="6"></el-option>
              <el-option label="进场特效" value="7"></el-option>
              <el-option label="扭蛋礼物" value="8"></el-option>
              <el-option label="扭蛋中礼物" value="9"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片" prop="dialogImageUrl">
            <el-upload
              action="https://api.haihaixingqiu.com/Api/upload"
              list-type="picture-card"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="form.dialogImageUrl"
              limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="svga动画" prop="fileList">
            <el-upload
              class="upload-demo"
              action="https://api.haihaixingqiu.com/Api/upload"
              :file-list="form.fileList"
              :on-success="handlefike"
              :on-remove="handleRemovefile"
            >
              <el-button size="small" type="primary">上传</el-button>
              <template #tip>
                <div class="el-upload__tip">请上传文件</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGift('formInline')">确 定</el-button>
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
        name: "",
        price: "",
        type: "",
        dialogImageUrl: [],
        fileList: [],
      },
      rules: {
        name: [{ required: true, message: "请输入礼物名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入礼物价格", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        dialogImageUrl: [{ required: true, message: "请插入图片", trigger: "blur" }],
        fileList: [{ required: true, message: "请插入动画", trigger: "blur" }],
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
        const res = await api.gift.getGift(option);
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
      if (val == 1) {
        state = "普通礼物";
      } else if (val == 2) {
        state = "亲密值礼物";
      } else if (val == 3) {
        state = "cp礼物";
      } else if (val == 4) {
        state = "头像框";
      } else if (val == 5) {
        state = "房间背景";
      } else if (val == 6) {
        state = "挚友";
      } else if (val == 7) {
        state = "进场特效";
      } else if (val == 8) {
        state = "扭蛋礼物";
      } else if (val == 9) {
        state = "扭蛋中礼物";
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

    const addGift = (formName) => {
      // console.log("formName", formName);
      console.log("datas.dialogImageUrl", datas.form.dialogImageUrl);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("submit!!");
          addGiftTrue();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const addGiftTrue = async () => {
      try {
        let option = {
          moudle: 87,
          node: 178,
          url: datas.form.fileList[0].response.data,
          price: datas.form.price * 100,
          type: datas.form.type,
          name: datas.form.name,
          cover: datas.form.dialogImageUrl[0].response.data,
        };

        // console.log("option", option);
        const res = await api.gift.setGift(option);
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

    const resetForm = () => {
      proxy.$refs["formInline"].resetFields();
    };

    onMounted(() => {
      getlist();
    });

    return {
      ...chData,
      addGift,
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
    };
  },
};
</script>
