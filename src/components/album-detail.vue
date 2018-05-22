<template>
    <transition name="move">
        <div v-if="showAlbumDetail" class="album-detail" >
        <!-- <div class="album-detail" > -->
            <img class="cover-img" :src="curAlbumImgSrc" alt="">
            <span @click="closeAlbumDetail">
                <CloseIcon class="icon icon-close" />
            </span>
            <div class="album-songs">
                <song-item
                    v-for="(song, index) in curAlbum.songs"
                    :key="song._id"
                    :song="song"
                    :index="index"
                ></song-item>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import SongItem from './song-item.vue';
import CloseIcon from "../../static/img/close.svg";

export default {
    name: 'album-detail',
    data () {
        return {}
    },
    components: {
        SongItem,
        CloseIcon
    },
    computed: {
        ...mapState([
            'showAlbumDetail',
            'curAlbum',
            'curAlbumImgSrc'
        ])
    },
    created () {
        console.log('this.curAlbum================>', this.curAlbum)
    },
    methods: {
        closeAlbumDetail () {
            this.$store.commit('setShowAlbumDetail', false)
        }
    }
}
</script>

<style lang="less" scoped>
    @import  (reference) "../less/mixin.less";
    .album-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: burlywood;

        .cover-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .icon-close {
            position: absolute;
            cursor: pointer;
            z-index: 100;
            right: 20px;
            top: 20px;
            width: 24px;
            height: 24px;
        }

        .album-songs {
            flex-flow: nowrap; // 防止高度被撑开
            z-index: 20;
            // margin-top: 300px;
            padding: 20px;
            background-color: #fff;
            width: 500px;
            min-height: 0;
            border-radius: @borderRadius;
        }
    }
</style>

