import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Select } from 'element-ui'
Vue.use(Button).use(Select)

Vue.config.productionTip = false
console.log('process.env-->', process.env)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
