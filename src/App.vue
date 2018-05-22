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
    @import "./less/common.less";
</style>