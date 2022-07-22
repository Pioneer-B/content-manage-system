<!--  -->
<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      :="contentTableConfig"
      :dataCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 新建用户按钮 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="newClick">{{ defaultBtn }}</el-button>
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
      <template #handle="slotProps">
        <div class="handle-btns">
          <el-button
            link
            size="small"
            type="primary"
            v-if="isUpdate"
            @click="editClick(slotProps.row)"
          >
            <el-icon><EditPen /></el-icon>
            <span class="btn">编辑</span>
          </el-button>
          <el-button
            link
            size="small"
            type="danger"
            v-if="isDelete"
            @click="deleteClick(slotProps.row)"
          >
            <el-icon><Delete /></el-icon>
            <span class="btn">删除</span>
          </el-button>
        </div>
      </template>
      <!-- 商品图片 -->
      <template #image="scoped">
        <el-image
          style="width: 60px; height: 60px"
          :src="scoped.row.imgUrl"
          :preview-src-list="[scoped.row.imgUrl]"
          :initial-index="4"
          fit="cover"
        />
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import myTable from '@/base-ui/table'
import { myUseStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  emits: ['newClick', 'editClick'],
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
  setup(props, { emit }) {
    const store = myUseStore()
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // pageInfo双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('moduleSystem/getPageListAction', {
        pageName: props.pageName,
        data: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    //从vuex里获取数据
    const dataList = computed(() => store.getters[`moduleSystem/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`moduleSystem/pageListCount`](props.pageName))

    // 删除、编辑、新建操作
    const deleteClick = (item: any) => {
      store.dispatch('moduleSystem/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const editClick = (item: any) => {
      emit('editClick', item)
    }
    const newClick = () => {
      emit('newClick')
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      deleteClick,
      editClick,
      newClick
    }
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
