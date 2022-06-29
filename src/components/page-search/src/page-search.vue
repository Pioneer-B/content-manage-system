<!--  -->
<template>
  <div class="page-search">
    <HYfrom v-bind="searchFromConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="footer-btn">
          <el-button>
            <el-icon><Refresh /></el-icon>
            <div class="btn-col" @click="handleResetClick">重置</div>
          </el-button>
          <el-button type="primary">
            <el-icon><Search /></el-icon>
            <div class="btn-col">搜索</div>
          </el-button>
        </div>
      </template>
    </HYfrom>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HYfrom from '@/base-ui/from'

export default defineComponent({
  components: { HYfrom },
  props: {
    searchFromConfig: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // 双向绑定的属性应该是由配置文件的filed属性来动态决定
    const formItems = props.searchFromConfig.formItems ?? []
    const originFormDate: any = {}
    for (const item of formItems) {
      originFormDate[`${item.filed}`] = ''
    }
    const formData = ref(originFormDate)
    const handleResetClick = () => {
      formData.value = originFormDate
      console.log(originFormDate, formData)
    }
    return { formData, handleResetClick }
  }
})
</script>
<style scoped lang="less">
.footer-btn {
  text-align: right;
  padding: 0 50px 20px 0;
  .btn-col {
    margin-left: 5px;
  }
}
</style>
