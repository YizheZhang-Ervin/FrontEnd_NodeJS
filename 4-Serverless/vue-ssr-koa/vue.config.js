const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const env = process.env
const isServer = env.RUN_ENV === 'server'

module.exports = {
  publicPath: './',
  outputDir: `dist/${env.RUN_ENV}`,
  assetsDir: 'static',
  configureWebpack: {
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/${env.RUN_ENV}.js`,
    devtool: 'eval',
    target: isServer ? 'node' : 'web',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
      libraryTarget: isServer ? 'commonjs2' : undefined
    },
    externals: isServer ? nodeExternals({
      allowlist: /\.css$/
    }) : undefined,
    optimization: { splitChunks: isServer ? false : undefined },
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 服务端默认文件名为 `vue-ssr-server-bundle.json`
    // 客户端默认文件名为 `vue-ssr-client-manifest.json`
    plugins: [
      isServer ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false,
      })
    ]
  }
}