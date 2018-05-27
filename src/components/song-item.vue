<template>
    <div :class="songsItemClass" @click="play(index)" @mouseover="toggleIsHover" @mouseout="toggleIsHover">
        <div class="song-item song-info">
            <img :src="`http://${song.img.url}`" alt="">
            <span>{{ song.audio_name }}</span>
        </div>
        <div class="song-item song-btn">
            <span v-if="isHover">
                <PlayIcon class="icon icon-animate"/>
            </span>
            <span v-else>
                <PlayWhiteIcon class="icon icon-animate"/>
            </span>
            <span>{{ song.play_times }}</span>
        </div>
        <div class="song-item song-btn">
            <span v-if="isHover" class="icon-button" @click.stop.prevent="addLoveTimes(song)">
                <LoveIcon class="icon icon-animate"/>
            </span>
            <span v-else>
                <LoveWhiteIcon class="icon icon-animate"/>
            </span>
            <span>{{ song.love_times }}</span>
        </div>
        <div class="song-item">
            <span>{{moment(song.sing_date).format('YYYY-MM-DD')}}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PlayWhiteIcon from "../../static/img/play_white.svg";
import PlayIcon from "../../static/img/play.svg";
import LoveIcon from "../../static/img/icon_love.svg";
import LoveWhiteIcon from "../../static/img/icon_love_white.svg";

export default {
    name: "song-item",
    props: ["song", "index"],
    components: {
        PlayWhiteIcon,
        PlayIcon,
        LoveIcon,
        LoveWhiteIcon,
    },
    computed: {
        ...mapState([
            'curPlayAudio'
        ]),
        ...mapGetters([
            'songsList'
        ]),
        songsItemClass () {
            if (this.curPlayAudio._id === this.song._id) {
                return 'songs-list-item active'
            } else {
                return 'songs-list-item'
            }
        }
    },
    data () {
        return {
            isHover: false
        }
    },
    methods: {
        // 播放
        play (CurPlayIndex) {
            // this.$store.commit("setWillPlayList", this.songsList)
            this.$store.commit("setCurPlayAudio", CurPlayIndex)
            this.$store.dispatch("playAudio")
            // this.$store.commit('addCurAudioPlayCount')
            this.$store.dispatch("addPlayCount")
        },

        addLoveTimes (audio) {
            this.$store.dispatch("addLoveCount", audio)
        },

        toggleIsHover () {
            this.isHover = !this.isHover
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";

.songs-list-item {
    position: relative;
    cursor: pointer;
    padding: 0 18px 0 8px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .song-item {
        display: inline-block;

        span {
            color: #fff;
        }
    }

    .song-info {
        width: 150px;
        span {
            margin-left: 5px;
        }
        img, span {
            vertical-align: middle;
        }
    }

    .song-btn {
        width: 50px;
        span {
            margin-left: 5px;
        }
        .icon, span {
            vertical-align: middle;
        }
    }

    img {
        width: 24px;
        height: 24px;
        object-fit: cover;
        border-radius: @borderRadius;;
    }
    
    
    &:hover {
        border-radius: @borderRadius;;
        background: #fff;
        box-shadow: 0 2px 15px -6px #777;
    }
}

.songs-list-item.active::before {
    content: '';
    position: absolute;
    left: -4px;
    width: 4px;
    height: 32px;
    background-color: #F1F3FF;
    border-radius: 3px;
}

.songs-list-item:hover{

    .song-item {
        span {
            color: #333;
        }
    } 
}
</style>


