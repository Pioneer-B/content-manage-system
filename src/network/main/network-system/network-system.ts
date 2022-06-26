import Request from '@/network'
import { IDataType, ILoginResult } from '@/store/main/module-system/system-type'

export function getPageListData(url: string, data: any) {
  return Request.post<IDataType<ILoginResult>>({
    url,
    data
  })
}
