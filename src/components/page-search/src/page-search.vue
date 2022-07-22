<!--  -->
<template>
  <div class="page-search">
    <HYfrom v-bind="searchFromConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="footer-btn">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>
            <div class="btn-col">重置</div>
          </el-button>
          <el-button type="primary" @click="handleSearchClick">
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
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    // 1.双向绑定的属性应该是由配置文件的filed属性来动态决定
    const formItems = props.searchFromConfig.formItems ?? []
    const originFormDate: any = {}
    for (const item of formItems) {
      originFormDate[item.filed] = ''
    }
    const formData = ref(originFormDate)

    // 2.点击重置
    // 实现方式一：将originFormDate传给子组件，父组件点击重置时，子组件执行formData.value= { ...props.originFormDate }
    // 注意先对props.originFormDate解构在赋值，这样formData和originFormDate是两个独立的对象，不会相互影响
    // 实现方法二：将formData.value对象里面的属性值改变后在传给子组件 formData.value[key] = originFormDate[key]
    // 实现方法三：父组件点击重置时，执行formData.value[key] = originFormDate[key]，子组件的输入框将v-model语法糖拆开写
    //  :modelValue="modelValue[`${item.filed}`]"
    // @update:model-value="handleValueChange($event, item.filed)"1
    // 监听到输入框值改变后函数执行 emit('update:model-value', { ...props.modelValue, [filed]: value })
    const handleResetClick = () => {
      // for (const key in formData.value) {
      //   formData.value[key] = originFormDate[key]
      // }
      formData.value = originFormDate

      emit('resetBtnClick')
    }

    // 3.点击搜索
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }
    return { formData, handleResetClick, HYfrom, originFormDate, handleSearchClick }
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
