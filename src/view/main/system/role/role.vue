<template>
  <div class="role">
    <page-search
      :searchFromConfig="searchFromConfig"
      @resetBtnClick="handleResetBtnClick"
      @searchBtnClick="handleSearchBtnClick"
    ></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      defaultBtn="新建角色"
      ref="pageContentRef"
      @editClick="handleEditClick"
      @newClick="hangdleNewClick"
    ></page-content>

    <page-model
      ref="pageModelRef"
      :modalConfig="modalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { myUseStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

import { ElTree } from 'element-plus'
import PageContent from '@/components/page-content/src/page-content.vue'
import PageSearch from '@/components/page-search/src/page-search.vue'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'

export default defineComponent({
  name: 'role',
  components: { PageContent, PageSearch, PageModel },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleSearchBtnClick] = usePageSearch()

    // 1.处理pageModule的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModelRef, defaultInfo, handleEditClick, hangdleNewClick] = usePageModel(
      undefined,
      editCallBack
    )
    const store = myUseStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      contentTableConfig,
      searchFromConfig,
      pageContentRef,
      handleResetBtnClick,
      handleSearchBtnClick,
      modalConfig,
      pageModelRef,
      defaultInfo,
      handleEditClick,
      hangdleNewClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
