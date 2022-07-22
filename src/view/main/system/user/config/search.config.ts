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
      filed: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名'
    },
    {
      filed: 'cellphone',
      label: '电话号码',
      type: 'input',
      placeholder: '请输入电话号码'
    },
    {
      filed: 'enable',
      label: '用户状态',
      type: 'select',
      placeholder: '请输入用户状态',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ]
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
