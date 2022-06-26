<template>
  <div class="role">
    <h2>role</h2>
    <Menu v-model="formData"></Menu>
    <!-- <Menu :modelValue="message" @update:model-value="message = $event"></Menu> -->
    <h2>{{ formData.name }}</h2>
    <h2>{{ formData.age }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Menu from '../menu/menu.vue'

export default defineComponent({
  name: 'role',
  components: {
    Menu
  },
  setup() {
    const formData: any = ref({ name: 's', age: 's' })
    return { formData }
  }
})
</script>

<style scoped></style>
