<template>
    <div class="music-box" v-bind:class="{ 'has-mask': hasMask }">
        <div class="navbar">
            <ul class="navgation">
                <li class="active">
                    🐛
                    <span>发现痒痒</span>
                </li>
                <li>
                    📺
                    <span>MV</span>
                </li>
            </ul>
        </div>
        <VuePerfectScrollbar class="scroll-area" :settings="settings">
          <div class="content">

              <div class="header">
                  <search-box></search-box>
              </div>
              
              <albums-list></albums-list>

              <div class="audio-content">
                  <songs-list></songs-list>
                  <live-audio></live-audio>
              </div>

          </div>
        </VuePerfectScrollbar>

        <album-detail v-if="showAlbumDetail"></album-detail>
        <audio-detail v-if="showAudioDetail"></audio-detail>
        <music-toolbar v-if="canPlayed"></music-toolbar>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import MusicToolbar from '../components/music-toolbar.vue';
import SongsList from '../components/songs-list.vue';
import AlbumsList from '../components/albums-list.vue';
import LiveAudio from '../components/live-audio.vue';
import AlbumDetail from '../components/album-detail.vue';
import AudioDetail from '../components/audio-detail.vue';
import SearchBox from '../components/search-box.vue';

export default {
  name: "music-box",
  components: {
    VuePerfectScrollbar,
    MusicToolbar,
    SongsList,
    AlbumsList,
    LiveAudio,
    AlbumDetail,
    AudioDetail,
    SearchBox,
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      }
    };
  },
  computed: {
    ...mapState([
      'hasMask',
      'canPlayed',
      'showAudioDetail',
      'showAlbumDetail'
    ]),
    ...mapGetters([
      'songsList'
    ])
  },
  created () {
    this.getAudioList()
  },
  methods: {
    async getAudioList () {
        try {
            const ret = await this.api.fetchAudioList()
            this.$store.commit('setAudioList', ret.data.results)
            this.$store.commit('setWillPlayList', this.songsList)
        } catch (error) {
            
        }
    },
    scrollHanle(evt) {
      console.log(evt)
    }
  }
};
</script>


<style lang="less">
@import (reference) "../less/mixin.less";

@h4MarginBottom: 30px;

.music-box {
  display: flex;
  flex-direction: row;
  width: 1170px;
  height: 720px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -360px;
  margin-left: -585px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;

  .navbar {
    position: relative;
    width: 186px;
    height: 100%;
    background-color: rgba(226, 233, 240, 0.4);

    ul.navgation {
      padding-top: 50px;

      li {
        // border-left: 4px solid transparent;
        position: relative;
        cursor: pointer;
        margin-bottom: 12px;
        padding-left: 24px;
        height: 24px;
        line-height: 24px;
        vertical-align: top;

        span {
          color: #8d9ebb;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 2px;
          margin-left: 14px;
          line-height: 14px;
          // vertical-align: top;
        }
      }

      li.active {
        span {
          color: #1e3c73;
        }
      }

      li:hover::before,
      li.active::before {
        content: "";
        position: absolute;
        left: 0;
        border-left: 3px solid #1e3c73;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        height: 18px;
        width: 20px;
      }
    }

  }

  .scroll-area {
    position: relative;
    width: @musicBoxContentWidth;
    // height: calc(@musicBoxHeight - @musicToolBarHeight);
    height: @musicBoxHeight;
    background-color: #fff;
  }

  .content {
    position: relative;
    width: @musicBoxContentWidth;
    // height: calc(@musicBoxHeight + @musicToolBarHeight);
    // overflow: scroll;
    padding: 0 @contentPadding;
    padding-bottom: calc(@musicToolBarHeight + 10px);
    background-color: #fff;

    .header {
      margin: 24px 0 50px 0;

      input {
        vertical-align: top;
      }
    }

    .audio-content {
        display: flex;
        justify-content: flex-start;
    }
  }
}

.music-box.has-mask {
  .content {
    overflow: hidden;
    height: 100%;
  }
}

.icon-search {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: url("../../static/img/search.svg") top center no-repeat fixed;
}

.music-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  z-index: -3;
  margin: -30px;
  background-image: url(http://p8lwkpir3.bkt.clouddn.com/home-bg.png);
  // background-image: url("../../static/img/home-bg.png");
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}
</style>
