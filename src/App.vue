<template>
  <div>
    <div>{{ $store.state.counter }}</div>
    <router-link to="/login">登陆</router-link>
    <router-link to="/main">主页</router-link>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
      <el-button>中文</el-button>
    </el-row>
    <router-view />
  </div>
</template>

<script lang="ts">
//defineComponent:让组件更好的支持ts，其实没啥用
import { defineComponent } from 'vue'
// import { ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

export default defineComponent({
  name: 'App'
  // components: {
  //   ElButton
  // }
})
</script>

<style lang="less"></style>
