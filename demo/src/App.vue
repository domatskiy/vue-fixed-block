<template>
    <div id="app">
        <div class="parent">
            <fixed-block
                @changeFix="changeFix"
                :fix-delay="100">
                <div class="fixed"> content d</div>
            </fixed-block>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'app',
      components: {},
      methods: {
        changeFix: function (fixed) {
          console.info('is fixed:', fixed)
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
        height: 200vh; width: 200px;
        margin: 20vh 100px 70vh;
        background-color: aliceblue;

        .fixed{
            display: inline-block;
            height: 50vh; width: 100%;
            background-color: #fff788;
        }
    }
</style>