type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType
  filed: string
  label: string
  rules?: any[]
  placeholder?: any
  // 用于select
  options?: any[]
  // 用于下拉框
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
