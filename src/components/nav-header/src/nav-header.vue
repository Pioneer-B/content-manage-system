<!--  -->
<template>
  <div>
    <div class="fold-menu">
      <template v-if="isFold === true">
        <el-icon @click="handleFoldClick"><DArrowRight /></el-icon>
      </template>
      <template v-else>
        <el-icon @click="handleFoldClick"><DArrowLeft /></el-icon>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['handleFoldChange'],
  setup(prop, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('handleFoldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>
<style scoped lang="less"></style>
