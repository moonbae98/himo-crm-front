const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../himo-crm/src/main/webapp/resources/vue', // Build Directory
  publicPath: process.env.NODE_ENV === 'production'
    ? './resources/vue/'   // 배포(build) 시
    : '/',                        // 개발(serve) 시
  devServer: {
    proxy: 'http://localhost:8080',
    port: 8080, // 필요하면 명시적으로 포트 지정
  },
})
