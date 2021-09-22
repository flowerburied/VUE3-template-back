<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>

            <span v-if="!data.moudleId">
              <a @click="append(data)"> 添加节点 </a>
              <a @click="remove(node, data)"> 删除节点 </a>
            </span>
          </span>
        </template>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";

import api from "@/api/api";
export default {
  components: {},
  setup() {
    const datas = reactive({
      defaultProps: {
        children: "children",
        label: "name",
      },
      data: [],
      page: 1,
      page_size: 999,
    });

    const chData = toRefs(datas); // 扩展运算符用

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
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      datas.data = [...datas.data];
    };

    const append = (data) => {
      const newChild = { id: 1, name: "testtest", children: [] };
      if (!data.children) {
        data.children = [];
      }
      data.children.push(newChild);
      datas.data = [...datas.data];
    };

    onMounted(() => {
      getlist();
    });

    return {
      ...chData,
      remove,
      append,
      getlist,
    };
  },
};
</script>

<style lang="scss">
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
