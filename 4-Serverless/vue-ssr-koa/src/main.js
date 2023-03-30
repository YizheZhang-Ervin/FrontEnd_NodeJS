import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'

Vue.config.productionTip = false

export const createApp = (context) => {
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  })
  return { router, app }
}