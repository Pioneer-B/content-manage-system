<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content/src/page-content.vue'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: { PageContent },
  setup(props, { emit }) {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
