import Request from '@/network'
import { IDataType, ILoginResult } from '@/store/main/module-system/system-type'

export function getPageListData(url: string, data: any) {
  return Request.post<IDataType<ILoginResult>>({
    url,
    data
  })
}

export function delatePageDate(url: string) {
  return Request.dedlete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return Request.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return Request.patch<IDataType>({
    url: url,
    data: editData
  })
}
