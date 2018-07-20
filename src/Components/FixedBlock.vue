<template>
  <div class="fixed-block" :class="blockClass">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'fixedBlock',
    props: {},
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

        if (this.fixed) {
          cl.push('fixed-block--fixed')
        }

        return cl.join(' ')
      }
    },
    methods: {
      isVisible: function () {
        return this.$el.offsetHeight !== null
      },
      initScrollHandler: function () {
        // console.log('fixed-block initScrollHandler ... wh=',window.innerHeight, ', element_height=', this.element_height)
        let w_height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        if(w_height > this.element_height - 40 && this.isVisible()){
          // console.log('fixed-block initScrollHandler ... addEventListener scroll')
          window.addEventListener('scroll', this.scrollHandler, {
            passive: true
          })
        } else {
          // console.log('fixed-block initScrollHandler ... removeEventListener scroll')
          window.removeEventListener('scroll', this.scrollHandler)
          this.fixed = false
        }
      },
      resizeHandler: function ($event) {
        // console.log('fixed-block resizeHandler ...')
        this.element_height = this.$el.offsetHeight
        this.element_top = this.$el.offsetTop

        this.parent_width = this.parent.clientWidth
        this.parent_height = this.parent.clientHeight

        let parent_computedStyle = getComputedStyle(this.parent);
        this.parent_width -= parseFloat(parent_computedStyle.paddingLeft) + parseFloat(parent_computedStyle.paddingRight);
        this.parent_height -= parseFloat(parent_computedStyle.paddingTop) + parseFloat(parent_computedStyle.paddingBottom);

        this.$el.style.width = this.parent_width + 'px'

        // console.log('fixed-block resizeHandler, pWidth=', this.parent_width, ', pHeight=', this.parent_height, ', eTop=',this.element_top, ', eHeight=',this.element_height)
        this.initScrollHandler()
      },
      scrollHandler: function ($event) {

        //let w_height = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        let parentBounding = this.parent.getBoundingClientRect()
        //console.log('fixed-block ', bounding)

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let f = this.parent_height + parentBounding.top;

        // console.log('fixed-block scrollHandler ... f=', f)
        // console.log('fixed-block scrollHandler ... ph=', this.parent_height, ', eH=', this.element_height, ', pTop=', parentBounding.top, ', scrollTop=', scrollTop, parentBounding)

        this.fixed = parentBounding.top < -2
        // console.log('fixed-block fixed=', this.fixed)

        if(f < this.element_height) {
          this.$el.style.top = (f - this.element_height) + 'px'
        } else {
          this.$el.style.top = '0';
        }

      }
    },
    mounted: function () {
      // console.log('fixed-block mounted')

      this.parent = this.$el.parentElement
      // this.resizeHandler()

      window.addEventListener('resize', this.resizeHandler, {
        passive: true
      })

    },
    updated: function () {
      // console.log('fixed-block updated', this.isVisible())
      Vue.nextTick(() => {
        this.resizeHandler()
      })
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
