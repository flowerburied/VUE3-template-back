<template>
  <div>
    <el-card>
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      </el-form> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="formInline.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="dialogTableVisible = true"
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
      </el-table>

      <el-dialog v-model="dialogTableVisible" title="新建广告">
        <el-form ref="formInline" label-width="80px" :model="formInline">
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片" prop="dialogImageUrl">
            <el-upload
              action="https://api.haihaixingqiu.com/Api/upload"
              list-type="picture-card"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="formInline.dialogImageUrl"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="success" plain @click="addAdver('formInline')"
              >确认</el-button
            >
          </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogTableVisible = false"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import api from "@/api/api";
export default {
  components: {},
  setup() {
    const datas = reactive({
      formInline: {
        region: "",
        position: "",
        dialogImageUrl: [],
      },
      rules: {
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
        position: [{ required: true, message: "请选择活动区域", trigger: "change" }],
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
    });
    const { proxy } = getCurrentInstance();
    const chData = toRefs(datas); // 扩展运算符用

    const getlist = async () => {
      try {
        const res = await api.advertisement.getBannerList();
        const { data, code } = res;
        console.log("res", res);
        if (code == 0) {
          datas.tableData = data;
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
      datas.dialogTableVisible = true;
    };

    const handlePictureCardPreview = (response, file, fileList) => {
      console.log("file.url", fileList);
      datas.formInline.dialogImageUrl = fileList;
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
      datas.formInline.dialogImageUrl = fileList;
    };

    const addAdver = (formName) => {
      // console.log("formName", formName);
      console.log("datas.formInline.dialogImageUrl", datas.formInline.dialogImageUrl);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    };
  },
};
</script>
