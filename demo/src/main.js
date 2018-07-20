import Vue from 'vue'
import App from './App.vue'

import FixedBlock from 'plugin'
Vue.use(FixedBlock)

new Vue({
  el: '#app',
  render: h => h(App)
})
