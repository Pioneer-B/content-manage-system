const { defineConfig } = require('@vue/cli-service')
// const path = require('path')

module.exports = defineConfig({
  // publicPath: './',
  transpileDependencies: true,
  // 1.配置方式一：CLI提供的属性；名称可能和webpack不一样，但是作用是一样的
  outputDir: './build',
  // 2.配置方式二：和webpack属性名称完全一样，最后会合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        assets: '@/assets'
      }
    }
  }
  // config是之前的所有属性，会作用参数传进来，我们可以对它做一些修改
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // 2.配置方式三：链式调用
  // chainWebpack: (config) => {
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views')
  // }
})
