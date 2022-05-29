<!--  -->
<template>
  <div class="panel-phone">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon>
      <el-form-item label="手机号" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="checkPass">
        <div class="get-code">
          <el-input v-model="ruleForm.checkPass" type="password" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  setup() {
    // const validatePass = (rule: any, value: any, callback: any) => {
    //   if (value === '') {
    //     callback(new Error('请输入账号'))
    //   }
    // }
    // const validatePass2 = (rule: any, value: any, callback: any) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   }
    // }

    const ruleForm = reactive({
      pass: '',
      checkPass: ''
    })

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    return {
      resetForm,
      ruleForm
    }
  }
})
</script>
<style scoped lang="less">
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
