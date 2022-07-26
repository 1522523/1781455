const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://kareza.com/another-api',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    }
}   
})
