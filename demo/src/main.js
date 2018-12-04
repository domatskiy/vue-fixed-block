import Vue from 'vue'
import App from './App.vue'

import FixedBlock from 'plugin'
Vue.use(FixedBlock)

import {Event} from 'plugin'

new Vue({
  el: '#app',
  mounted: function () {
    Event.$on('change-fix', ($fixed) => {
      console.log('Event change-fix', $fixed)
    })
  },
  render: h => h(App)
})
