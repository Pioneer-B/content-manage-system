<template>
  <div class="user">
    <page-search :searchFromConfig="searchFromConfig"></page-search>

    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      defaultBtn="新建用户"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import pageSearch from '@/components/page-search/src/page-search.vue'
import PageContent from '@/components/page-content/src/page-content.vue'

export default defineComponent({
  components: { pageSearch, PageContent },
  name: 'user',

  setup() {
    return {
      searchFromConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
