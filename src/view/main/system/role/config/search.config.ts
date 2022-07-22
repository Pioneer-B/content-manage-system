import { IForm } from '@/base-ui/from'

export const searchFromConfig: IForm = {
  labelWidth: '120px',
  itemStyle: { padding: '10px 40px' },
  formItems: [
    {
      filed: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      filed: 'intro',
      label: '权限介绍',
      type: 'input',
      placeholder: '请输入权限介绍'
    },
    {
      filed: 'createAt',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
