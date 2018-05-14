<template>
    <div id = "app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {
        }
    }
</script>

<style lang = "less">
    @import "./less/reset.less";
    /* #app {
        padding-top: 2.6944rem;
    } */
</style>