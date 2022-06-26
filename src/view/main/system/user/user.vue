<template>
  <div class="user">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <div class="user-content">
      <my-table
        :listData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
      >
        <template #status="slotProps">
          <el-button size="small" plain :type="slotProps.row.enable ? 'success' : 'danger'">
            {{ slotProps.row.enable ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #createAt="slotProps">
          {{ $filters.formatTime(slotProps.row.createAt) }}
        </template>
        <template #updateAt="slotProps">
          {{ $filters.formatTime(slotProps.row.updateAt) }}
        </template>
      </my-table>
      <!-- <el-table :data="userList" border stripe min-width="180">
        <template v-for="item in propList" :key="item.prop">
          <el-table-column :="item" align="center">
            <template #default="slotProps">
             slotProps.row:每一行的数据
              {{ slotProps.row[item.prop] }}
            </template>
          </el-table-column>
        </template>
      </el-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import pageSearch from '@/components/page-search/src/page-search.vue'
import { myUseStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'

import { searchFromConfig } from './config/search.config'

import myTable from '@/base-ui/table'

export default defineComponent({
  components: { pageSearch, myTable },
  name: 'user',
  setup() {
    const store = myUseStore()
    store.dispatch('moduleSystem/getPageListAction', {
      pageUrl: '/users/list',
      data: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.moduleSystem.userList)
    const userCount = computed(() => store.state.moduleSystem.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]

    const showIndexColumn = ref(true)
    const showSelectColumn = ref(true)
    return {
      searchFromConfig,
      userList,
      userCount,
      propList,
      showIndexColumn,
      showSelectColumn
    }
  }
})
</script>

<style scoped lang="less">
.user-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
