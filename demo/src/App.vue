<template>
    <div id="app">
        <div class="parent">
            <fixed-block>
                content d
            </fixed-block>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'app',
      components: {},
      data () {
        return {}
      }
    }
</script>

<style lang="less" scoped>
    .parent{
        display: inline-block;
        height: 200vh; width: 50%;
        margin: 20vh 100px 50vh;
        background-color: aliceblue;
    }
</style>