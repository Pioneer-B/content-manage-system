<template>
  <div class="menu">
    <h2>menu</h2>

    <!-- <h2 @click="click">{{ comput }}</h2> -->
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    return {}
  }
})
</script>

<style scoped></style>
