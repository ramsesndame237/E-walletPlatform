import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Breadcrumb from '@/components/Common/Breadcrumb'

Vue.component('bpd-breadcrumb', Breadcrumb)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
