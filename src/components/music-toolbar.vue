<template>
    <transition name="fade">
        <div
            v-if="" 
            class="music-toolbar">
            <div class="song-info">
                <img src="../../static/img/home-bg.png" alt="">
                <ul>
                    <li>
                        <h3 class="song-title">木头的心</h3>
                    </li>
                    <li>
                        <span class="song-singer">
                            cover 常石磊
                        </span>
                    </li>
                </ul>
            </div>
            <div class="operate-btns">
                <MusicRepeatIcon class="icon btn btn-repeat" />
                <MusicPreviousIcon class="icon btn btn-pre" />
                <MusicPlayIcon class="icon btn btn-play" />
                <MusicNextIcon class="icon btn btn-next" />
            </div>
            <div class="song-time-ctrl">
                <div class="timeline"></div>
            </div>
        </div>
    </transition>
</template>

<script>
import MusicRepeatIcon from '../../static/img/music_repeat.svg';
import MusicShuffleIcon from '../../static/img/music_shuffle.svg';
import MusicPlayIcon from '../../static/img/music_play.svg';
import MusicPreviousIcon from '../../static/img/music_previous.svg';
import MusicNextIcon from '../../static/img/music_next.svg';

export default {
  name: 'music-toolbar',
  components: {
      MusicRepeatIcon,
      MusicShuffleIcon,
      MusicPlayIcon,
      MusicPreviousIcon,
      MusicNextIcon
  },
  data () {
      return {}
  }
}
</script>

<style lang="less">
    @import (reference) "../less/mixin.less";
    .music-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        width: 984px;
        height: @musicToolBarHeight;
        padding-left: 8px;
        padding-right: 24px;
        right: 0;
        bottom: 0;
        background-color: rgba(247, 249, 250, 1);

        .song-info {
            width: 200px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: 54px;
                height: 54px;
                margin-right: 16px;
                border-radius: @borderRadius;
            }

            .song-title {
                font-weight: bold;
                font-size: 16px;
            }

            .song-singer {
                font-size: 12px;
                color: #99A6BD;
            }
        }

        .operate-btns {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .btn {
                cursor: pointer;
                margin-right: 10px;
            }

            .btn-play {
                width: 40px;
                height: 40px;
            }
        }

        .song-time-ctrl {
            width: 200px;
            .timeline {
                width: 200px;
                height: 2px;
                border-radius: 2px;
                background: #7485FF;
            }
        }
    }
</style>
