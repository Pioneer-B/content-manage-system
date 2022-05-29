<!-- s -->
<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/Login-panel.vue'

// import { ref } from 'vue'

export default defineComponent({
  components: { LoginPanel },
  setup() {
    return {}
  }
})
</script>
<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url('@/assets/img/login-bg.svg');
}
</style>
