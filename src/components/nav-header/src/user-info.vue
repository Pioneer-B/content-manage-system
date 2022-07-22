<!--  -->
<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="userInfo.circleUrl" style="margin-right: 5px" />
        {{ name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CircleClose /></el-icon>
            <div>退出登录</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><User /></el-icon>
            <div>用户信息</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Tools /></el-icon>
            <div>系统管理</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import localCache from '@/utils/cache'
import pi from '@/assets/img/pi.jpg'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.loginModule.userInfo.name)
    const userInfo = reactive({
      circleUrl: pi
    })

    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    return { name, userInfo, handleExitClick }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-item {
  display: flex;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
