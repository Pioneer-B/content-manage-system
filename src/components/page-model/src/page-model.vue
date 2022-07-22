<!--  -->
<template>
  <div class="page-model">
    <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center destroy-on-close>
      <h-yfrom :="modalConfig" v-model="fromData"></h-yfrom>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { myUseStore } from '@/store'

import HYfrom from '@/base-ui/from'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: { HYfrom },
  setup(props) {
    const centerDialogVisible = ref(false)
    const fromData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          fromData.value[item.filed] = newValue[item.filed]
        }
      }
    )

    // 点击确定按钮的逻辑
    const store = myUseStore()
    const handleConfirmClick = () => {
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户')
        store.dispatch('moduleSystem/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...fromData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        store.dispatch('moduleSystem/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...fromData.value, ...props.otherInfo }
        })
      }
    }

    return { centerDialogVisible, fromData, handleConfirmClick }
  }
})
</script>
<style scoped lang="less"></style>
