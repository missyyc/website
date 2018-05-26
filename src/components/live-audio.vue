<template>
     <div class="dayliveaudios">
        <h4>每日直播音频</h4>

        <div class="dayliveaudios-list">
            <div class="dayliveaudios-list-item" v-for="(audio, index) in liveAudiosList" @click="playLiveAudio(audio)">
                <img :src="`http://${audio.img.url}`" alt="">
                <p>{{audio.audio_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'live-audio',
    data () {
        return {
        }
    },
    computed: {
        ...mapState([
            'audioList'
        ]),
        ...mapGetters([
            'liveAudiosList'
        ])
    },
    created () {
    },
    methods: {

        playLiveAudio (curAudio) {
            const index = this.audioList.findIndex(audio => audio._id === curAudio._id)
            console.log('index================>', index)
            if (index >= 0) {
                this.$store.commit("setCurPlayAudio", index)
            } else {
                this.audioList.push(curAudio)
                console.log('this.audioList================>', this.audioList.length)
                this.$store.commit('setAudioList', this.audioList)
                this.$store.commit("setCurPlayAudio", this.audioList.length - 1)
            }
            this.$store.dispatch("playAudio")
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
        justify-content: space-between;

        .dayliveaudios-list-item {
            cursor: pointer;
            // margin-right: 23px;
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

            p {
                text-align: center;
            }
        }
    }
}
</style>


