<!--  -->
<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 左侧导航栏 -->
      <el-aside :width="IsFoldValue ? '60px' : '200px'" class="el-aside1">
        <nav-menu :collapse="IsFoldValue" />
      </el-aside>

      <el-container class="page">
        <!-- 导航栏顶部 -->
        <el-header class="page-header">
          <nav-header @handleFoldChange="handleFoldChange" />
        </el-header>
        <!-- 主体 -->
        <el-main class="page-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header/src/nav-header.vue'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },

  setup() {
    const IsFoldValue = ref(false)
    const handleFoldChange = (fold: boolean) => {
      IsFoldValue.value = fold
    }

    return {
      handleFoldChange,
      IsFoldValue
    }
  }
})
</script>
<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-aside1 {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
