<template>
    <div class="albums">
        <h4 class="yyc-h4-font">专辑歌曲</h4>
        <VuePerfectScrollbar class="albumlist-scroll-area" :settings="settings">
            <div class="albums-list">
                <div class="album-item" v-for="(album, index) in albumsList" @click="showAlbum(album)">
                    <div class="album-item-cover">
                        <img :src="`http://${album.img.url}`" alt="">
                    </div>
                    <h5>{{ album.album_name }}</h5>
                </div>
            </div>
        </VuePerfectScrollbar>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'albums-list',
  data () {
      return {
            albumsList: [],
            settings: {
                maxScrollbarLength: 60
            }
      }
  },

  components: {
      VuePerfectScrollbar
  },

  created () {
      this.getAlbumsList()
  },

  methods: {
        async getAlbumsList () {
            try {
                    const ret = await this.api.fetchAlbumsList()
                    this.albumsList = ret.data.results || []
                } catch (error) {
                    
                }
        },

        // 显示专辑详情
        showAlbum (album) {
            this.$store.commit('setCurAlbum', album)
            this.$store.commit('setWillPlayList', album.songs)
            this.$store.commit('setShowAlbumDetail', true)
        }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";
.albums {
    h4 {
        .h4-font;
        margin-bottom: @h4MarginBottom;
    }
    .albumlist-scroll-area {
        position: relative;
        width: calc(@musicBoxContentWidth - @contentPadding * 2);
        // height: 140px;
        margin-bottom: 50px;
    }
    .albums-list {
        display: flex;
        // width: 100%;
        // overflow-x: scroll;
        flex-direction: row;

        .album-item {
            margin-right: 34px;
            text-align: center;
            .album-item-cover {
            width: 140px;
            height: 140px;
            cursor: pointer;
            border-radius: @borderRadius;
            box-shadow: 0 2px 30px -6px #777;

            img {
                width: 100%;
                height: 100%;
                border-radius: @borderRadius;
                object-fit: cover;
            }
            }
            h5 {
                font-size: 14px;
                margin-top: 16px;
                letter-spacing: 2px;
                color: #fff;
            }
        }
    }
}
</style>


