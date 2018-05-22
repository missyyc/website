<template>
    <div :class="songsItemClass" @click="play(index)">
        <div class="song-item song-info">
            <img :src="`http://${song.img.url}`" alt="">
            <span>{{ song.audio_name }}</span>
        </div>
        <div class="song-item song-btn">
            <PlayIcon class="icon"/>
            <span>{{ song.play_times }}</span>
        </div>
        <div class="song-item song-btn">
            <LoveIcon class="icon"/>
            <span>{{ song.love_times }}</span>
        </div>
        <span>{{moment(song.sing_date).format('YYYY-MM-DD')}}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayIcon from "../../static/img/play.svg";
import LoveIcon from "../../static/img/icon_love.svg";

export default {
    name: "song-item",
    props: ["song", "index"],
    components: {
        PlayIcon,
        LoveIcon,
    },
    computed: {
        ...mapState([
            'curPlayAudio'
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
        return {}
    },
    methods: {
        // 播放
        play (CurPlayIndex) {
            this.$store.commit("setCurPlayAudio", CurPlayIndex)
            this.$store.dispatch("playAudio")
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
</style>


