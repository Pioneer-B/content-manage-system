import { IForm } from '@/base-ui/from'

export const searchFromConfig: IForm = {
  labelWidth: '120px',
  itemStyle: { padding: '10px 40px' },
  formItems: [
    {
      filed: 'id',
      label: 'id',
      type: 'input',
      placeholder: '请输入id'
    },
    {
      filed: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      filed: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码'
    },
    {
      filed: 'sport',
      label: '喜欢的运动',
      type: 'select',
      placeholder: '请输入运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      filed: 'createTime',
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
