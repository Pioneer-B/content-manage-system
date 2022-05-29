<template>
  <router-view />
</template>

<script lang="ts">
//defineComponent:让组件更好的支持ts，对js没啥用
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
  // components: {
  //   ElButton
  // }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
