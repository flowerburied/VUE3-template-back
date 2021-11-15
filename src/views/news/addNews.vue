<template>
  <div>
    <el-card>
      <el-form
        label-width="120px"
        :rules="rules"
        ref="fromname"
        :model="formInline"
        label-position="right"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formInline.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="预览内容" prop="previewcontent">
          <el-input
            v-model="formInline.previewcontent"
            placeholder="请输入预览内容"
          ></el-input>
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

        <el-form-item class="QuillEditor" label="内容" prop="content">
          <QuillEditor
            @textChange="textChange"
            ref="QuillEditor"
            toolbar="full"
            :modules="modules"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="getHTML('fromname')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance, defineComponent } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import api from "@/api/api";
// 富文本
import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";
import BlotFormatter from "quill-blot-formatter";
// import BlotFormatter from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default defineComponent({
  components: {
    QuillEditor,
  },
  setup() {
    const { proxy } = getCurrentInstance(); //this
    const datas = reactive({
      formInline: {
        title: "",
        previewcontent: "",
        dialogImageUrl: [],
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        previewcontent: [{ required: true, message: "请输入预览内容", trigger: "blur" }],
        dialogImageUrl: [{ required: true, message: "请插入图片", trigger: "blur" }],
        content: [{ required: true, message: "请插入图片", trigger: "blur" }],
      },
      contentQuillEditor: "",

      QuillEditor: null,

      modules: [
        {
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
        {
          name: "blotFormatter",
          module: BlotFormatter,
          options: {
            /* options */
          },
        },
      ],
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

            // addAdmin(handleArray);
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

    const addNews = async () => {
      try {
        let option = {
          moudle: 86,
          node: 176,
          title: datas.formInline.title,
          previewcontent: datas.formInline.previewcontent,
          img: datas.formInline.dialogImageUrl[0].response.data,
          content: datas.formInline.content,
          id: 0,
        };
        console.log("option", option);
        const res = await api.news.setMsg(option);

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

    const getHTML = (formName) => {
      // console.log("datas.content", datas.QuillEditor.getHTML());
      console.log("datas.getContents", datas.formInline);
      proxy.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          addNews();
          console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    const handlePictureCardPreview = (response, file, fileList) => {
      console.log("file.url", fileList);
      datas.formInline.dialogImageUrl = fileList;
    };
    const handleRemove = (file, fileList) => {
      console.log(file, fileList);
      datas.formInline.dialogImageUrl = fileList;
    };

    const textChange = () => {
      console.log("datas.content", datas.formInline.content);
      datas.formInline.content = datas.QuillEditor.getHTML();
    };

    onMounted(() => {});

    return {
      ...toRefs(datas),
      onSubmit,
      getHTML,
      handlePictureCardPreview,
      handleRemove,
      textChange,
    };
  },
});
</script>

<style lang="scss">
.QuillEditor {
  // height: 120px;
  min-height: 120px;
  margin-bottom: 120px;
}
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
