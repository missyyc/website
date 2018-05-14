<template>
    <div class="music-box">
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
        <div class="content">
                <div class="header">
                    <SearchIcon class="icon" />
                    <input type="text" placeholder="搜索歌曲">
                </div>
                <div class="albums">
                    <h4>专辑歌曲</h4>
                    <div class="albums-list">
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>废烟</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>扎心三连</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>扎心十连</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>废烟</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>废烟</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>废烟</h5>
                        </div>
                        <div class="album-item">
                            <div class="album-item-cover">
                                <img src="../../static/img/home-bg.png" alt="">
                            </div>
                            <h5>废烟</h5>
                        </div>
                    </div>
                </div>

                <div class="audio-content">
                    <songs-list></songs-list>
                    <div class="dayliveaudios">
                        <h4>每日直播音频</h4>

                        <div class="dayliveaudios-list">
                            <div class="dayliveaudios-list-item">
                                <img src="../../static/img/love.png" alt="">
                            </div>
                            <div class="dayliveaudios-list-item">
                                <img src="../../static/img/love.png" alt="">
                            </div>
                            <div class="dayliveaudios-list-item">
                                <img src="../../static/img/love.png" alt="">
                            </div>
                            <div class="dayliveaudios-list-item">
                                <img src="../../static/img/love.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>

        </div>
        
        <music-toolbar></music-toolbar>
    </div>
</template>

<script>
import SearchIcon from "../../static/img/search.svg";
import MusicToolbar from '../components/music-toolbar.vue';
import SongsList from '../components/songs-list.vue';

export default {
  name: "music-box",
  components: {
    SearchIcon,
    MusicToolbar,
    SongsList,
  },
  data() {
    return {};
  },
  computed: {}
};
</script>


<style lang="less">
@import (reference) "../less/mixin.less";

@paddingLeft: 47px;
@borderRadius: 8px;
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

  .content {
    width: 984px;
    height: 100%;
    padding-bottom: @musicToolBarHeight;
    overflow: scroll;
    padding-left: @paddingLeft;
    background-color: #fff;

    .header {
      margin: 24px 0 50px 0;

      input {
        vertical-align: top;
      }
    }

    .albums {
      h4 {
        .h4-font;
        margin-bottom: @h4MarginBottom;
      }
      .albums-list {
        display: flex;
        width: 100%;
        overflow-x: scroll;
        flex-direction: row;
        margin-bottom: 50px;

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
          }
        }
      }
    }

    .audio-content {
        display: flex;
        justify-content: flex-start;
    }

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
                    object-fit: cover;
                }
            }
        }
    }
  }
}

.icon-search {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: url("../../static/img/search.svg") top center no-repeat fixed;
}

.icon {
  display: inline-block;
  font-size: 0;
  width: 16px;
  height: 16px;
  background-size: cover;
  background-repeat: no-repeat;
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
  background-image: url("../../static/img/home-bg.png");
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}
</style>
