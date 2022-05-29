<!--  -->
<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <login-panel-account ref="panelAccountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-panel-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="checked1" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginBtn">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPanelAccount from './Login-panel-account.vue'
import LoginPanelPhone from './login-panel-phone.vue'

export default defineComponent({
  components: {
    LoginPanelAccount,
    LoginPanelPhone
  },
  setup() {
    const checked1 = ref(true)
    const currentTab = ref('account')

    const panelAccountRef = ref<InstanceType<typeof LoginPanelAccount>>()
    const handleLoginBtn = () => {
      if (currentTab.value === 'account') {
        panelAccountRef.value?.loginAction(checked1.value)
      }
    }

    return {
      checked1,
      handleLoginBtn,
      panelAccountRef,
      currentTab
    }
  }
})
</script>
<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 8px;
  }
}

.demo-tabs {
  .demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  .demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }
}
</style>
