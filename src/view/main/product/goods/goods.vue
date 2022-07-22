<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/src/page-content.vue'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: { pageContent },
  name: 'goods',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
