<template>
  <div>
    <el-card>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" plain @click="dialogFormVisible = true"
            >新建广告</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="danger" plain @click="delAdmin">删除广告</el-button>
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
        <el-table-column property="position" label="位置"> </el-table-column>
        <el-table-column label="图片">
          <template v-slot="scope">
            <el-image
              fit="scale-down"
              style="width: 100px; height: 100px"
              :src="scope.row.url"
              :preview-src-list="scope.row.srcList"
            >
            </el-image>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="收货地址" v-model="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="区域" prop="position">
            <el-select v-model="form.position" placeholder="请选择区域">
              <el-option label="首页" value="首页"></el-option>
              <el-option label="广场" value="广场"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片" prop="dialogImageUrl">
            <el-upload
              action="https://api.haihaixingqiu.com/Api/upload"
              list-type="picture-card"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="form.dialogImageUrl"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAdver('ruleForm')">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import api from "@/api/api";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {},
  setup() {
    const datas = reactive({
      form: {
        position: "",
        dialogImageUrl: [],
      },
      rules: {
        position: [{ required: true, message: "请选择区域", trigger: "change" }],
        dialogImageUrl: [{ required: true, message: "请插入图片", trigger: "blur" }],
      },
      tableData: [],
      currentRow: null,
      total: 1,
      page: 1,
      page_size: 100,
      testval: "正常",
      dialogTableVisible: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
    });
    const { proxy } = getCurrentInstance();
    const chData = toRefs(datas); // 扩展运算符用

    const getlist = async () => {
      try {
        const res = await api.advertisement.getBannerList();
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          for (let i = 0; i < data.length; i++) {
            let content = JSON.parse(data[i].content);
            data[i].url = content[0].url;
            let contentArr = [];
            for (let c = 0; c < content.length; c++) {
              contentArr.push(content[c].url);
            }
            data[i].srcList = contentArr;
          }

          datas.tableData = data;
        }
      } catch (err) {
        console.log("err!", err);
      }
    };

    const handletChange = (val) => {
      datas.currentRow = val;
    };

    const seeDefault = () => {
      datas.dialogTableVisible = true;
    };

    const handlePictureCardPreview = (response, file, fileList) => {
      console.log("file.url", fileList);
      datas.form.dialogImageUrl = fileList;
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
      datas.form.dialogImageUrl = fileList;
    };

    const addAdver = (formName) => {
      // console.log("formName", formName);
      console.log("datas.dialogImageUrl", datas.form.dialogImageUrl);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("submit!!");
          addAdverTrue();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const addAdverTrue = async () => {
      try {
        let handleimg = [];

        for (let i = 0; i < datas.form.dialogImageUrl.length; i++) {
          let imglist = {
            name: datas.form.dialogImageUrl[i].name,
            url: datas.form.dialogImageUrl[i].response.data,
          };
          handleimg.push(imglist);
        }
        // console.log("handleimg", handleimg);

        let option = {
          content: JSON.stringify(handleimg),
          position: datas.form.position,
          moudle: 85,
          node: 174,
        };

        // console.log("option", option);
        const res = await api.advertisement.setBanner(option);
        const { code, message } = res;
        console.log("res", res);
        if (code == 0) {
          ElMessage({
            showClose: false,
            message: "成功",
            type: "success",
          });
          getlist();
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
          id: datas.currentRow.id,
          moudle: 85,
          node: 175,
        };
        const res = await api.advertisement.deleteBanner(option);
        const { code, message } = res;
        console.log("res", res);
        if (code == 0) {
          ElMessage({
            showClose: false,
            message: "成功",
            type: "success",
          });
          getlist();
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

    onMounted(() => {
      getlist();
    });

    return {
      ...chData,

      getlist,

      handletChange,

      seeDefault,
      handleRemove,
      handlePictureCardPreview,
      addAdver,
      delAdmin,
    };
  },
};
</script>
