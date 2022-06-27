<!--  -->
<template>
  <div class="page-content">
    <my-table :listData="usersList" :="contentTableConfig">
      <!-- 新建用户按钮 -->
      <template #headerHandler>
        <el-button type="primary">{{ defaultBtn }}</el-button>
      </template>
      <!-- 状态列 -->
      <template #status="slotProps">
        <el-button size="small" plain :type="slotProps.row.enable ? 'success' : 'danger'">
          {{ slotProps.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- 创建时间列 -->
      <template #createAt="slotProps">
        {{ $filters.formatTime(slotProps.row.createAt) }}
      </template>
      <!-- 更新时间列 -->
      <template #updateAt="slotProps">
        {{ $filters.formatTime(slotProps.row.updateAt) }}
      </template>
      <!-- 操作列 -->
      <template #handle>
        <div class="handle-btns">
          <el-button link size="small" type="primary">
            <el-icon><EditPen /></el-icon>
            <span class="btn">编辑</span>
          </el-button>
          <el-button link size="small" type="danger">
            <el-icon><Delete /></el-icon>
            <span class="btn">删除</span>
          </el-button>
        </div>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import myTable from '@/base-ui/table'
import { myUseStore } from '@/store'

export default defineComponent({
  components: {
    myTable
  },
  props: {
    defaultBtn: {
      type: String,
      default: '默认按钮'
    },
    pageName: {
      type: String,
      required: true
    },
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = myUseStore()
    store.dispatch('moduleSystem/getPageListAction', {
      pageName: props.pageName,
      data: {
        offset: 0,
        size: 10
      }
    })

    const usersList = computed(() => store.getters[`moduleSystem/pageListData`](props.pageName))
    // const userCount = computed(() => store.state.moduleSystem.userCount)

    return { usersList }
  }
})
</script>
<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.handle-btns {
  display: flex;
  .btn {
    margin-left: 5px;
  }
}
</style>
