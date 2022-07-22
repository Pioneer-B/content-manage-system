<!--  -->
<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import baseEchart from '@/base-ui/echart'

const props = defineProps<{
  xLabels: string[]
  values: any[]
}>()
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类销量',
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>
<style scoped lang="less"></style>
