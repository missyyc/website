<template>
    <!-- <div class="stage" ref="stage" :style="{'background-image': `url(${backgroundImage})`}"> -->
    <div class="stage" ref="stage">
        <music-box></music-box>
        <span class="copyright">@copyright 牛逼的二群孕育出的痒痒虫科技部！</span>
    </div>
</template>

<script>
    import MusicBox from './music-box.vue';
    export default {
        name: "banner",
        components: {
            'music-box': MusicBox
        },
        data() {
            return {
                backgroundImage: require('../../static/img/home-bg.png')
            }
        },
        computed: {
            
        },
        // 根据loop的值初始化
        created() {
        },
        beforeMount () {
        },
        // 自动播放
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>

<style lang = "less">
    .stage {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
        background-image: url('../../static/img/home-bg.png');
        background-position: center top;
        background-size: cover;

        .copyright {
            position: absolute;
            bottom: 20px;
            color: #fff;
        }
    }
</style>