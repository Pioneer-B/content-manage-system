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
            <div class="btn-col">重置</div>
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
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return { formData }
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
