'use strict'
const path = require('path')
// const utils = require('./utils')
// const webpack = require('webpack')
// const config = require('../config')
// const merge = require('webpack-merge')
// const baseWebpackConfig = require('./webpack.base.conf')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const portfinder = require('portfinder')
// const os = require('os')

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: process.env.VUE_APP_OUTPUTDIR, // 输出文件目录
  lintOnSave: process.env.NODE_ENV !== 'production', // eslint-loader 是否在保存的时候检查
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  productionSourceMap: false,
  // 对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {

  },
  // 调整 webpack 配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        } // 别名配置
      }
    })
  },
  css: {
    // 启用 CSS modules
    modules: false,
    // 是否使用css分离插件
    extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/global.scss";'
      }
    }
  },
  devServer: {
    // host: 'localhost',
    host: '0.0.0.0',
    port: 8000, // 端口号
    https: true, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/arzapi': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/arzapi': ''
        }
      }
    }
  }
}
