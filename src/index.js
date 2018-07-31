import FixedBlockComponent from './Components/FixedBlock.vue'
import Event from './Event'

const FixedBlock = {
  install (Vue, options = {}) {
    Vue.component(FixedBlockComponent.name, FixedBlockComponent)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FixedBlock)
}

export {
  Event
}

export default FixedBlock
