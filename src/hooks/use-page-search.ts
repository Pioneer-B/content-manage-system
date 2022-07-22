import { ref } from 'vue'
import pageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()

  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchBtnClick = (value: any) => {
    pageContentRef.value?.getPageData(value)
  }

  return [pageContentRef, handleResetBtnClick, handleSearchBtnClick]
}
