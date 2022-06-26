<!--  -->
<template>
  <div class="my-table">
    <el-table
      :data="listData"
      border
      stripe
      min-width="180"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelectColumn" type="selection"> </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="80"
        v-if="showIndexColumn"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column :="item" align="center">
          <!-- el-table-column里面有一个默认插槽，利用作用域插槽将row(每行的数据)传给使用者 -->
          <template #default="slotProps">
            <!-- slotProps.row：每行的数据 -->
            <slot :name="item.slotName" :row="slotProps.row">
              {{ slotProps.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    propList: {
      type: Object,
      required: true
    },
    listData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }
    return { handleSelectionChange }
  }
})
</script>
<style scoped lang="less"></style>
