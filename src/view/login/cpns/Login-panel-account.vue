<!-- 账号登陆表单 -->
<template>
  <div class="panel-account">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
      <el-form-item label="账号" prop="name" required>
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import type { FormInstance } from 'element-plus'
import cache from '@/utils/cache'

export default defineComponent({
  setup() {
    const ruleFormRef = ref<FormInstance>()
    const store = useStore()

    const ruleForm = reactive({
      name: cache.getCache('name') ?? '',
      password: cache.getCache('password') ?? ''
    })

    const rules = reactive({
      name: [
        {
          required: true,
          message: '用户名是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5~10个字母或者数字~',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名必须是3位以上的字母或者数字~',
          trigger: 'blur'
        }
      ]
    })

    const loginAction = (checked: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (checked) {
            if (!window.localStorage.getItem('name')) {
              console.log(1)

              cache.setCache('name', ruleForm.name)
              cache.setCache('password', ruleForm.password)
            }
          } else {
            cache.deleteCache('name')
            cache.deleteCache('password')
          }
          // 2.开始进行登录操作
          store.dispatch('loginModule/accountLoginAction', { ...ruleForm })
        }
      })
    }

    return {
      rules,
      ruleForm,
      loginAction,
      ruleFormRef
    }
  }
})
</script>
<style scoped lang="less"></style>
