<template>
     <div class="dayliveaudios">
        <h4>每日直播音频</h4>

        <div class="dayliveaudios-list">
            <div class="dayliveaudios-list-item" v-for="(audio, index) in liveAudioList">
                <img :src="`http://${audio.img.url}`" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'live-audio',
    data () {
        return {
            liveAudioList: []
        }
    },
    created () {
        this.getLiveAudioList()
    },
    methods: {
        async getLiveAudioList() {
            try {
                const ret = await this.api.fetchAudioList('live_audio')
                this.liveAudioList = ret.data.results || []
            } catch (error) {
                
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";
.dayliveaudios {
    width: 380px;
    margin-left: 30px;
    h4 {
        .h4-font;
        margin-bottom: @h4MarginBottom;
    }
    .dayliveaudios-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .dayliveaudios-list-item {
            margin-right: 23px;
            margin-bottom: 23px;
            width: 154px;
            height: 95px;
            border-radius: @borderRadius;;
            box-shadow: 0 2px 30px -6px #777;
            
            img {
                width: 100%;
                height: 100%;
                border-radius: 3px;
                object-fit: cover;
            }
        }
    }
}
</style>


