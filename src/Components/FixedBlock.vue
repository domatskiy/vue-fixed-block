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
        element_top: 0
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
        let wHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight
        // console.log('initScrollHandler', wHeight, this.parent_height, this.element_height + 40, this.isVisible())
        if (!this.disabled && wHeight > this.element_height + 40 && this.parent_height > this.element_height + 40 && this.isVisible()) {
          // console.log('add scroll handler')
          window.addEventListener('scroll', this.scrollHandler, {
            passive: true
          })
        } else {
          // console.log('remove scroll handler')
          window.removeEventListener('scroll', this.scrollHandler, false)
          if (this.fixed === true) {
            this.$set(this, 'fixed', false)
          }
        }
      },
      resizeHandler: function ($event) {
        // console.log('resizeHandler')
        this.calc()
        this.initScrollHandler()
      },
      calc: function () {
        // console.log('calc')
        this.element_height = this.$el.offsetHeight
        this.element_top = this.$el.offsetTop

        this.parent_width = this.parent.clientWidth
        this.parent_height = this.parent.clientHeight

        let parenComputedStyle = getComputedStyle(this.parent)
        this.parent_width -= parseFloat(parenComputedStyle.paddingLeft) + parseFloat(parenComputedStyle.paddingRight)
        this.parent_height -= parseFloat(parenComputedStyle.paddingTop) + parseFloat(parenComputedStyle.paddingBottom)

        this.$el.style.width = this.parent_width + 'px'
      },
      scrollHandler: function ($event) {
        let parentBounding = this.parent.getBoundingClientRect()
        let fixed = !this.disabled && (parentBounding.top < -this.fixDelay)
        if (this.fixed !== fixed) {
          this.$set(this, 'fixed', fixed)
        }

        if (fixed) {
          // остаток места
          let f = this.parent_height + parentBounding.top
          // console.log('scrollHandler, fixed=', fixed, 'f=', f, this.element_height, parentBounding.top)
          if (f > this.element_height) {
            this.$el.style.top = 0
          } else {
            this.$el.style.top = (f - this.element_height) + 'px'
          }
        } else {
          this.$el.style.top = 'auto'
        }
      }
    },
    mounted: function () {
      this.parent = this.$el.parentElement
      window.addEventListener('resize', this.resizeHandler, {
        passive: true
      })
      this.resizeHandler()
      Event.$on('recalc', () => {
        // console.log('on recalc')
        this.calc()
        this.scrollHandler()
      })
    },
    updated: function () {
      // console.log('updated el')
      /* Vue.nextTick(() => {
        this.calc()
        this.scrollHandler()
      }) */
    },
    watch: {
      disabled: function ($disabled) {
        // console.log('disabled changed')
        this.fixed = false
        this.calc()
        this.scrollHandler()
      },
      fixed: function ($fixed) {
        // console.log('fixed changed')
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
