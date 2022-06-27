<!--  -->
<template>
  <div class="my-table">
    <!-- 插槽-header栏 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 中间表格数据 -->
    <el-table
      :data="listData"
      border
      stripe
      min-width="180"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选框 -->
      <el-table-column v-if="showSelectColumn" type="selection"> </el-table-column>
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="80" v-if="showIndexColumn" align="center">
      </el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column :="item" align="center">
          <!-- el-table-column里面有一个默认插槽，利用作用域插槽将row(每行的数据)传给使用者 -->
          <template #default="slotProps">
            <!-- 动态添加插槽.   slotProps.row：每行的数据 -->
            <slot :name="item.slotName" :row="slotProps.row">
              {{ slotProps.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 插槽-footer栏 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    propList: {
      type: Object,
      required: true
    },
    listData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }

    const currentPage4 = ref(4)
    const pageSize4 = ref(100)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return {
      handleSelectionChange,
      currentPage4,
      pageSize4,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
