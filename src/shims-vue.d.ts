/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
/**
 * 对.vue文件做声明，
 * DefineComponent：内部定义的一个组件类型，
 * 所以我们每个.vue文件导出的类型都是component对象
 * export default defineComponent({})
 */
