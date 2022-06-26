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
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
              <!-- 1.文字输入框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.filed}`]"
                />
              </template>
              <!-- 2.下拉选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.filed}`]"
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
                  v-model="formData[`${item.filed}`]"
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
import { defineComponent, PropType, ref, watch } from 'vue'
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
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:model-value', newValue)
      },
      { deep: true }
    )
    return { formData }
  }
})
</script>
<style scoped lang="less">
.hy-form {
  padding-top: 18px;
}
</style>
