const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../himo-crm/src/main/webapp/resources/vue', // Build Directory
	publicPath: './resources/vue/',
  devServer: {
		proxy: 'http://localhost:8080',
	},
})
