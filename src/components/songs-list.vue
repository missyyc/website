<template>
  <div class="songs">
        <h4>歌曲列表</h4>
        <div class="songs-list">
            <!-- <div class="songs-list-item active" v-for="(song, index) in audioList"  @click="play(index)">
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
            </div> -->
            <song-item 
                v-for="(song, index) in songsList"
                v-bind:key="song._id"
                v-bind:song="song"
                :index="index"
            >
            </song-item>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from './song-item.vue';

export default {
    name: 'songs-list',
    components: {
        SongItem,
    },
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'songsList',
        ])
    },
    methods: {
        
        
    }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";
.songs {
    width: 530px;
    h4 {
        .h4-font;
        margin-bottom: @h4MarginBottom;
    }
    .songs-list {
        margin-left: -8px;
        margin-top: -5px;
    }
}
</style>
