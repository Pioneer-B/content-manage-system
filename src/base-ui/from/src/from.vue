<!--  -->
<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form status-icon :label-width="labelWidth">
      <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="id" style="margin-top: 18px"> <el-input /> </el-form-item>
        </el-col> -->
        <template v-for="item in formItems" :key="item.label">
          <el-col :="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 1.文字输入框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                />
              </template>
              <!-- 2.下拉选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- 3.日期选择框 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :="item.otherOptions"
                  :model-value="modelValue[`${item.filed}`]"
                  @update:modelValue="handleValueChange($event, item.filed)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../index'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      //引用类型的默认值要使用函数且是箭头函数(和this有关系)
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // 24/6=4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    // 把formData复制一份，浅拷贝
    // formData对modelValue是没有依赖的，他只是进行了复制拷贝，当modelValue发生改变时，...也不会重新解构
    // 也可以理解为...不是响应式的，当modelValue发生改变时，...也不会重新解构
    // const formData = ref({ ...props.modelValue })

    // watch(
    //   formData,
    //   (newValue) => {
    //     // console.log('newValue', newValue)

    //     emit('update:model-value', newValue)
    //   },
    //   { deep: true }
    // )
    const handleValueChange = (value: any, filed: string) => {
      emit('update:model-value', { ...props.modelValue, [filed]: value })
    }
    return { handleValueChange }
  }
})
</script>
<style scoped lang="less">
.hy-form {
  padding-top: 18px;
}
</style>
