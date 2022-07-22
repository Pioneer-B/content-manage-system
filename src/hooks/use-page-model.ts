import { ref } from 'vue'
import PageModel from '@/components/page-model'

type callBackFn = (item?: any) => void

export function usePageModel(newCallBack?: callBackFn, editCallBack?: callBackFn) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})

  const hangdleNewClick = () => {
    // 新建时给defaultInfo赋值空对象，不然点击编辑后，在点击新建会有问题：新建时表单和编辑时的表单的内容是一样
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true
    }
    newCallBack && newCallBack()
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true
    }
    editCallBack && editCallBack(item)
  }
  return [pageModelRef, defaultInfo, handleEditClick, hangdleNewClick]
}
