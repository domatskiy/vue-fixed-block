import FixedBlock from './Components/FixedBlock.vue'

const FixedBlockPlugin = {
  install (Vue, options = {}) {
    console.log('install ', FixedBlock.name)
    Vue.component(FixedBlock.name, FixedBlock)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FixedBlockPlugin)
}

export default FixedBlockPlugin
