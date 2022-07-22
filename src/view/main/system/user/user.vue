<template>
  <div class="user">
    <page-search
      :searchFromConfig="searchFromConfig"
      @resetBtnClick="handleResetBtnClick"
      @searchBtnClick="handleSearchBtnClick"
    ></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      defaultBtn="新建用户"
      ref="pageContentRef"
      @editClick="handleEditClick"
      @newClick="hangdleNewClick"
    ></page-content>

    <page-model
      :modalConfig="modalConfigRef"
      ref="pageModelRef"
      pageName="users"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { myUseStore } from '@/store'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/model.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
  components: { pageSearch, pageContent, PageModel },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetBtnClick, handleSearchBtnClick] = usePageSearch()

    // pageModal相关的hook逻辑
    // 1.处理密码的逻辑
    const newCallBack = () => {
      const formItem = modalConfig.formItems.find((item) => item.filed === 'password')
      formItem!.isHidden = false
    }
    const editCallBack = () => {
      const formItem = modalConfig.formItems.find((item) => item.filed === 'password')
      formItem!.isHidden = true
    }
    // 2.动态添加部门和角色列表
    const store = myUseStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => item.filed === 'departmentId')
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find((item) => item.filed === 'roleId')
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageModelRef, defaultInfo, handleEditClick, hangdleNewClick] = usePageModel(
      newCallBack,
      editCallBack
    )

    return {
      searchFromConfig,
      contentTableConfig,
      pageContentRef,
      handleResetBtnClick,
      handleSearchBtnClick,
      modalConfigRef,
      handleEditClick,
      pageModelRef,
      defaultInfo,
      hangdleNewClick
    }
  }
})
</script>

<style scoped lang="less"></style>
