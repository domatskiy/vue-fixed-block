<template>
    <div id="app">
        <button @click="callRecalc">callRecalc</button>
        <div class="parent">
            <fixed-block
                @changeFix="changeFix"
                :disabled="false"
                :fix-delay="20">
                <div class="fixed"> content d</div>
            </fixed-block>
        </div>
    </div>
</template>

<script>
    import {Event} from 'plugin'
    export default {
      name: 'app',
      components: {},
      methods: {
        changeFix: function (fixed) {
          console.info('is fixed:', fixed)
        },
        callRecalc: function () {
          Event.$emit('recalc')
        }
      },
      data () {
        return {}
      }
    }
</script>

<style lang="less" scoped>
    .parent{
        display: inline-block;
        height: 150vh; width: 200px;
        margin: 20vh 100px 70vh;
        background-color: aliceblue;

        .fixed{
            display: inline-block;
            height: 50vh; width: 100%;
            background-color: #fff788;
        }
    }
</style>
