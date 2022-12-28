require("dotenv").config()
const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      [process.env.PREFIX]: {
        target: process.env.API_URL,
        pathRewrite: {[`^${process.env.PREFIX}`] : ''}
      }
    }
  }
  /*devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {'^/api' : ''}
      }
    }
  }*/
})