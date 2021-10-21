<template>
  <div>
    <el-card>
      <div class="js-ac">
        <el-page-header content="举报详情" @back="goBack" />
        <el-button type="success" plain @click="dialogVisible = true">回复</el-button>
      </div>

      <el-divider></el-divider>
      <el-descriptions title="基础信息">
        <el-descriptions-item label="举报人ID">
          <el-divider direction="vertical"></el-divider
          >{{ currentRow.urandId }}</el-descriptions-item
        >
        <el-descriptions-item label="举报类型">
          <el-divider direction="vertical"></el-divider
          >{{ currentRow.type }}</el-descriptions-item
        >
        <el-descriptions-item label="被举报人ID">
          <el-divider direction="vertical"></el-divider
          >{{ currentRow.reportrandId }}</el-descriptions-item
        >

        <el-descriptions-item label="被举报人昵称">
          <el-divider direction="vertical"></el-divider
          >{{ currentRow.nickname }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions title="基础信息" :column="1">
        <el-descriptions-item label="详细描述">
          <el-divider direction="vertical"></el-divider>
          {{ currentRow.content }}
        </el-descriptions-item>

        <el-descriptions-item label="截图上传" v-if="currentRow.geturl">
          <el-divider direction="vertical"></el-divider>
          <el-image
            style="width: 100px; height: 100px"
            :src="currentRow.geturl[0]"
            :preview-src-list="currentRow.geturl"
          >
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template> </el-image
        ></el-descriptions-item>
      </el-descriptions>

      <el-dialog
        v-model="dialogVisible"
        title="回复"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="Please input"
        />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="reply">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, getCurrentInstance } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import router from "@/router/index";
import api from "@/api/api";
export default {
  components: {},
  setup() {
    const { proxy } = getCurrentInstance(); //this
    const route = useRoute();
    const datas = reactive({
      currentRow: {},
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      dialogVisible: false,
      textarea: "",
    });
    const goBack = () => {
      router.back();
    };

    const reply = async () => {
      if (datas.textarea) {
        try {
          let option = {
            moudle: 90,
            node: 185,
            content: datas.textarea,
            id: datas.currentRow.id,
          };

          console.log("option", option);
          const res = await api.report.RepleyRportFed(option);

          console.log("res", res);
          const { code, message } = res;
          if (code == 0) {
            ElMessage({
              showClose: false,
              message: "回复成功",
              type: "success",
            });
            datas.dialogVisible = false;
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
      } else {
        ElMessage({
          showClose: false,
          message: "请输入回复内容",
          type: "error",
        });
      }
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    onMounted(() => {
      datas.currentRow = JSON.parse(route.query.currentRow);

      datas.currentRow.url = JSON.parse(datas.currentRow.url);
      if (datas.currentRow.url.length!=0) {
        let option = [];
        for (let i = 0; i < datas.currentRow.url.length; i++) {
          option.push(datas.currentRow.url[i].url);
        }
        console.log("option", option);
        datas.currentRow.geturl = option;
      }

      console.log("datas.currentRow", datas.currentRow);
    });

    return {
      ...toRefs(datas),
      goBack,
      reply,
      handleClose,
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
