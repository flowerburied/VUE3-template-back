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
        <el-table-column property="title" label="协议标题"> </el-table-column>
        <!-- <el-table-column property="price" label="价格"> </el-table-column> -->
        <el-table-column label="状态">
          <template v-slot="scope">
            {{ scope.row.status == 1 ? "使用中" : "已过期" }}
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template v-slot="scope">
            {{ switchfun(scope.row.type) }}
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
          <el-form-item label="协议标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="协议类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择协议类型">
              <el-option label="用户协议" value="1"></el-option>
              <el-option label="隐私政策" value="2"></el-option>
              <el-option label="社区规范" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="QuillEditor" label="内容" prop="content">
            <QuillEditor
              @textChange="textChange"
              ref="QuillEditor"
              toolbar="full"
              :modules="modules"
              v-model="content"
            />
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
import { onMounted, reactive, toRefs, getCurrentInstance, nextTick } from "vue";
import getTrueTime from "@/utils/getTime";
import api from "@/api/api";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index";

// 富文本
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
// import BlotFormatter from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },

  setup() {
    const { proxy } = getCurrentInstance();
    const datas = reactive({
      formInline: { name: "" },

      form: {
        title: "",
        type: "",
        content:
          "<p>“嗨嗨”用户协议是您（下称“用户”）与“嗨嗨”之间签订的协议。“嗨嗨”软件是一款语音网络社交工具。</p>",
      },
      rules: {
        title: [{ required: true, message: "请输入协议标题", trigger: "blur" }],

        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        content: [{ required: true, message: "请插入图片", trigger: "blur" }],
      },
      tableData: [],
      currentRow: null,
      total: 1,
      page: 1,
      page_size: 100,
      testval: "正常",
      dialogTableVisible: false,
      //   富文本
      QuillEditor: null,
      modules: {
        name: "ImageUploader",
        module: ImageUploader,
        options: {
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", file);

              fetch("https://api.haihaixingqiu.com/Api/upload", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  resolve(result.data);
                })
                .catch((error) => {
                  reject("Upload failed");
                  console.error("Error:", error);
                });
            });
          },
        },
      },
    });

    const chData = toRefs(datas); // 扩展运算符用

    const getlist = async () => {
      try {
        let option = {
          page: datas.page,
          page_size: datas.page_size,
        };
        const res = await api.agreement.getAgreementList(option);
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
        state = "用户协议";
      } else if (val == 2) {
        state = "隐私政策";
      } else if (val == 3) {
        state = "社区规范";
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
      console.log("form", datas.form);
      //   console.log("datas.dialogImageUrl", datas.form.dialogImageUrl);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("submit!!");
          //   addGiftTrue();
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
    const textChange = () => {
      //   console.log("datas.content", datas.form.content);
      datas.form.content = datas.QuillEditor.getHTML();
    };

    const setHTML = () => {
      datas.QuillEditor.setHTML(datas.form.content);
    };

    const addnews = () => {
      datas.dialogTableVisible = true;

 

      setTimeout(() => {
            setHTML();
      }, 500);
    
    };
    onMounted(() => {
      getlist();
      //   setHTML()
    });

    return {
      addnews,
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
      textChange,
    };
  },
};
</script>

<style lang="scss">
.QuillEditor {
  // height: 120px;
  min-height: 120px;
  margin-bottom: 120px;
}
</style>
