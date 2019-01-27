<template>
  <div class="fixed-block" :class="blockClass">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Event from './../Event'

  export default {
    name: 'fixedBlock',
    props: {
      fixDelay: {
        type: Number,
        required: false,
        default: function () {
          return 10
        }
      },
      disabled: {
        type: Boolean,
        required: false,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
        fixed: false,
        body: null,
        parent: null,
        parent_width: null,
        parent_height: null,
        element_height: null,
        element_top: 0,
        scrollHandlerAdded: false
      }
    },
    computed: {
      blockClass: function () {
        let cl = []

        if (!this.disabled && this.fixed) {
          cl.push('fixed-block--fixed')
        }
        // console.log('computed blockClass', cl)
        return cl.join(' ')
      }
    },
    methods: {
      isVisible: function () {
        // console.log('isVisible', this.$el.offsetHeight !== null)
        return this.$el.offsetHeight !== null
      },
      initScrollHandler: function () {
        /*let wHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
        console.log('fixed-block initScrollHandler', wHeight, this.parent_height, this.element_height + 40, this.isVisible(), this.scrollHandlerAdded)
        if (!this.scrollHandlerAdded && !this.disabled && wHeight > this.parent_height && this.parent_height > this.element_height + 40 && this.isVisible()) {
          console.log('fixed-block add scroll handler')
          window.addEventListener('scroll', this.scrollHandler, {
            passive: true
          })
          this.scrollHandlerAdded = true
        } else if (this.scrollHandlerAdded) {
          console.log('fixed-block remove scroll handler')
          window.removeEventListener('scroll', this.scrollHandler, false)
          if (this.fixed === true) {
            this.$set(this, 'fixed', false)
          }
          this.scrollHandlerAdded = false
        }*/
      },
      resizeHandler: function ($event) {
        // console.log('resizeHandler')
        this.calc()
        // this.initScrollHandler()
      },
      /**
       * получение размеров блоков
       */
      calc: function () {
        // console.log('calc')
        this.element_height = this.$el.offsetHeight
        this.element_top = this.$el.offsetTop

        this.parent_width = this.parent.clientWidth
        this.parent_height = this.parent.clientHeight

        let parenComputedStyle = getComputedStyle(this.parent)
        this.parent_width -= parseFloat(parenComputedStyle.paddingLeft) + parseFloat(parenComputedStyle.paddingRight)
        this.parent_height -= parseFloat(parenComputedStyle.paddingTop) + parseFloat(parenComputedStyle.paddingBottom)
        // console.log('fixed-block calc: parent_height=', this.parent_height, 'element_height=', this.element_height)

        this.$el.style.width = this.parent_width + 'px'
      },
      scrollHandler: function ($event) {
        let parentBounding = this.parent.getBoundingClientRect()
        let wHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
        let fixed = !this.disabled && wHeight > this.element_height && (parentBounding.top < -this.fixDelay) && this.parent_height > this.element_height + 1
        // console.log('fixed-block scrollHandler: fixed=', fixed, 'parent_height=', this.parent_height, 'top=', parentBounding.top, 'element_height=', this.element_height)
        if (this.fixed !== fixed) {
          this.$set(this, 'fixed', fixed)
        }

        if (fixed) {
          // остаток места
          let f = this.parent_height + parentBounding.top - 2
          // остаток > высоты элемента
          this.$el.style.top = '-' + (f >= this.element_height ? 0 : this.element_height - f) + 'px'
        } else {
          this.$el.style.top = 'auto' // TODO save style
        }
      }
    },
    mounted: function () {
      this.parent = this.$el.parentElement
      this.resizeHandler()
      this.scrollHandler()

      this.$nextTick(() => {
        // console.log('fixed-block add handler')
        window.addEventListener('resize', this.resizeHandler, {
          passive: true
        })
        window.addEventListener('scroll', this.scrollHandler, {
          passive: true
        })
      })

      Event.$on('recalc', () => {
        // console.log('fixed-block on recalc')
        this.calc()
        this.scrollHandler()
      })
    },
    destroyed: function () {
      // console.log('fixed-block destroyed, remove handler')
      window.removeEventListener('scroll', this.scrollHandler, false)
    },
    updated: function () {
      // console.log('fixed-block updated el')
      setTimeout(() => {
        this.calc()
        this.scrollHandler()
      }, 500)
    },
    watch: {
      disabled: function ($disabled) {
        console.log('fixed-block disabled changed')
        this.fixed = false
        this.calc()
        this.scrollHandler()
      },
      fixed: function ($fixed) {
        console.log('fixed-block fixed changed')
        this.$emit('changeFix', $fixed)
        Event.$emit('change-fix', $fixed)
      }
    }
  }
</script>

<style lang="less" scope>
  .fixed-block{
    width: 100%;
    height: min-content;

    &--fixed{
      position: fixed;
      top: 0;
    }
  }
</style>
