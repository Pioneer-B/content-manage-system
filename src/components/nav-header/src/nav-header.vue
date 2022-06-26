<!--  -->
<template>
  <div class="nav-header">
    <div class="fold-menu">
      <template v-if="isFold === true">
        <el-icon @click="handleFoldClick"><DArrowRight /></el-icon>
      </template>
      <template v-else>
        <el-icon @click="handleFoldClick"><DArrowLeft /></el-icon>
      </template>
    </div>
    <div class="content">
      <hy-nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { myUseStore } from '@/store'
import { useRoute } from 'vue-router'
import hyNavBreadcrumb from '@/base-ui/breadcrumb/index'
import userInfo from './user-info.vue'
import { pathMapToBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: { userInfo, hyNavBreadcrumb },
  emits: ['handleFoldChange'],
  setup(prop, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('handleFoldChange', isFold.value)
    }

    // 面包屑数据
    const store = myUseStore()

    const route = useRoute()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenu
      const path = route.path
      return pathMapToBreadcrumbs(userMenus, path)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  .content {
    margin: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
