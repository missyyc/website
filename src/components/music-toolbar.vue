<template>
    <transition name="move">
        <div
            v-if = "canPlayed" 
            class="music-toolbar-container">
            <div class="audio">
                <audio :src = "curPlayAudioSrc" :loop = "loop" @canplay = "canplay" @ended = "ended" ref = "audio"></audio>
            </div>

            <div class="music-toolbar">
                <div class="song-info">
                    <div class="song-info-img" @click="expandSongDetail">
                        <span class="expand-btn">
                            <ExpandIcon class="icon btn" />
                        </span>
                        <img :src="curPlayImgSrc" alt="">
                    </div>
                    <ul>
                        <li>
                            <h3 class="song-title">{{ curPlayAudio.audio_name }}</h3>
                        </li>
                        <li>
                            <span class="song-singer">
                                cover {{ curPlayAudio.cover_singer }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="operate-btns">
                    <span @click="switchMode">
                        <MusicOrderIcon v-show="modeType === 'order'" class="icon btn" />
                        <MusicRandomIcon v-show="modeType === 'random'" class="icon btn" />
                        <MusicOneIcon v-show="modeType === 'loop'" class="icon btn" />
                    </span>
                    <span @click="changePlay('pre')">
                        <MusicPreviousIcon class="icon btn btn-pre" />
                    </span>
                    <span @click="togglePlayState">
                        <MusicPlayIcon v-if="paused"class="icon btn btn-play" />
                        <MusicStopIcon v-else class="icon btn btn-play"/>
                    </span>
                    <span @click="changePlay('next')">
                        <MusicNextIcon class="icon btn btn-next" />
                    </span>
                </div>

                <div class="time-wrap">
                    <div class="start-time">{{ curPlayTime | formatDate }}</div>
                    <div class="progress-wrap">
                        <div class="progress-bar" @click = "updateProgress" ref = "progressBar"></div>
                        <div class="progress" :style = "{width: progress + '%'}"></div>
                        <div class="progress-dot" ref = "progressDot" :style = "{'margin-left': progress + '%'}"></div>
                    </div>
                    <div class="end-time">{{ endTime | formatDate }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import MusicOrderIcon from '../../static/img/music_queue.svg';
import MusicRandomIcon from '../../static/img/music_shuffle.svg';
import MusicOneIcon from '../../static/img/music_one.svg';
import MusicPlayIcon from '../../static/img/music_play.svg';
import MusicStopIcon from '../../static/img/music_stop.svg';
import MusicPreviousIcon from '../../static/img/music_previous.svg';
import MusicNextIcon from '../../static/img/music_next.svg';
import ExpandIcon from '../../static/img/expand.svg';

export default {
    name: 'music-toolbar',
    components: {
        MusicOrderIcon,
        MusicRandomIcon,
        MusicOneIcon,
        MusicPlayIcon,
        MusicStopIcon,
        MusicPreviousIcon,
        MusicNextIcon,
        ExpandIcon
    },
    data () {
        return {
            curPlayTime: 0,
            endTime: 0,
            progress: 0,
            progressSpeed: 0,
            progressTimer: null,
        }
    },
    computed: {
        ...mapState([
            "loop",
            "audio",
            "isPlayed",
            "lock",
            "paused",
            "modeType",
            "canPlayed",
            "curPlayAudio",
            "curPlayIndex",
            "curPlayAudioSrc",
            "curPlayImgSrc"
        ]),
        ...mapGetters([
            "listTotal"
        ]),
    },

    created () {
        this.init()
    },

    watch: {
        isPlayed (newIsPlayed, oldIsPlayed) {
            if (newIsPlayed) {
                this.initPlay()
            }
        },
        paused(newPaused, oldPaused) {
            console.log('>>> paused', newPaused);
            if(newPaused) {
                this.clearTimer();
            }
            else {
                this.progressTimer = setTimeout(() => {
                    this.progressGo();
                }, 1000);
                // this.rollTimer = setTimeout(() => {
                //     this.lrcRoll();
                // }, 100);
            }
        },
    },

    methods: {
        // 根据localStorage中的数据初始化播放信息
        init () {
            let mode = 1;
            let { modeType, lrcSwitch } = window.localStorage;
            
            if(!modeType) {
                modeType = "order";
            }
            if(modeType === "loop") {
                mode = 2;
            }
            else if(modeType === "random") {
                mode = 3;
            }
            if(lrcSwitch === 'false') {
                lrcSwitch = false;
            }
            else {
                lrcSwitch = true
            }

            this.$store.commit("setModeType", modeType);
            this.$store.commit('setLrcSwitch', lrcSwitch);
            
            this.mode = mode;
        },
        // 监听audio的canplay事件
        canplay() {
            console.log('this.lock================>', this.lock)
            if(this.lock) return;
            const audio = this.$refs.audio;
            console.log('audio================>', audio, audio.readyState)
            if(audio.readyState === 4) {
                audio.play();
                this.$store.commit("setAudio", audio);
                this.$store.commit("setIsPlayed", true);
            }
            else {
                console.log('歌曲暂时无法播放, 请稍后重试================>')
            }
        },

        // 监听audio的ended事件
        ended() {
            console.log('ended================>')
            if(this.modeType !== "order") return;

            let curPlayIndex = this.curPlayIndex;
            curPlayIndex++;
            this.$store.commit("setCurPlayIndex", curPlayIndex);
            this.$store.commit("setCanPlayed", false)
            this.$store.dispatch("playAudio");
        },

        initPlay () {
            this.progress = 0;
            this.curPlayTime = 0;
            this.audio.currentTime = 0;
            this.endTime = parseInt(this.audio.duration);
            this.progressSpeed = Number((100 / this.endTime).toFixed(2));
            if(this.progressTimer) {
                this.clearTimer();
            }
            this.progressGo();
        },
        // 时间进度条前进
        progressGo() {
            this.curPlayTime++;
            this.progress += this.progressSpeed;
            if(this.progress < 100) {
                this.progressTimer = setTimeout(() => {
                    this.progressGo();
                }, 1000);
            }
            else {
                this.progress = 100;
                this.curPlayTime = this.endTime;
                this.dealMode();
            }
        },

        // 清除定时器
        clearTimer() {
            clearTimeout(this.progressTimer);
        },

        // 歌曲结束时根据播放模式来处理
        dealMode() {
            this.$store.commit("setLock", false);
            console.log('this.modeType================>', this.modeType)
            if(this.modeType === "random") {
                const randomIndex = Math.floor(Math.random() * this.listTotal);

                this.$store.commit("setCurPlayIndex", randomIndex);
                this.$store.dispatch("playAudio");
            } else if(this.modeType === "loop") {
                this.initPlay();
            }
        },

        switchMode () {
            let modeTypes = ['random', 'loop', 'order']
            const index = modeTypes.indexOf(this.modeType)
            let modeType
            if (index < modeTypes.length - 1) {
                modeType = modeTypes[index + 1]
            } else {
                modeType = modeTypes[0]
            }
            this.$store.commit("setModeType", modeType);
        },

        // 点击进度条更新时间
        updateProgress(evt) {
            const offsetX = evt.offsetX;
            const targetWidth = this.$refs.progressBar.offsetWidth;
            this.progress = Number((offsetX / targetWidth * 100).toFixed(2));
            this.curPlayTime = parseInt((this.endTime * this.progress / 100).toFixed(2));
            this.audio.currentTime = this.curPlayTime;

            this.$store.commit("setLock", true);
        },
        // 切换状态 play or paused
        togglePlayState () {
            this.$store.commit("setPaused");
        },

        // 切歌 上一首 or 下一首
        changePlay(operate) {
            let curPlayIndex = this.curPlayIndex;
            operate === "next" ? curPlayIndex++ : curPlayIndex--;

            this.$store.commit("setCurPlayIndex", curPlayIndex);
            // this.$store.commit("setLock", false);
            this.$store.dispatch("playAudio");
        },

        expandSongDetail () {
            this.$store.commit("setHasMask", true)
            this.$store.commit("setShowAudioDetail", true)
        }
    },
    filters: {
        // 进度条时间过滤器
        formatDate(time) {
            let minutes = parseInt(time / 60);
            let seconds = parseInt(time % 60);
            if(minutes < 10) {
                minutes = `0${minutes}`;
            }
            if(seconds < 10) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`;
        }
    },
}
</script>

<style lang="less">
    @import (reference) "../less/mixin.less";
    .music-toolbar-container {
        .music-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: absolute;
            z-index: 10;
            width: 984px;
            height: @musicToolBarHeight;
            padding-left: 8px;
            padding-right: 24px;
            right: 0;
            bottom: 0;
            background-color: rgba(247, 249, 250, 1);
    
            .song-info {
                width: 400px;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .song-info-img {
                    position: relative;
                    width: 54px;
                    height: 54px;
                    margin-right: 16px;
                    border-radius: @borderRadius;
                    overflow: hidden;
                    cursor: pointer;
                    
                    &:hover {
                        .expand-btn {
                            opacity: 1;
                        }
                    }

                    .expand-btn {
                        opacity: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: rgba(0, 0, 0, .5);
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
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
                    width: 20px;
                    height: 20px;
                }
    
                .btn-play {
                    width: 40px;
                    height: 40px;
                }
            }
    
    
             .time-wrap {
                width: 400px;
                color: #99A6BD;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .progress-wrap {
                    // flex: 1;
                    cursor: pointer;
                    width: 200px;
                    height: 4px;
                    border-radius: 4px;
                    // overflow: hidden;
                    position: relative;
                    margin: 0 8px;
                    background-color: #6c6b70;
                    .progress-bar {	
                        // width: 100%;
                        width: 200px;
                        height: 100%;
                        position: relative;
                        z-index: 1;
                    }
                    .progress {
                        left: 0;
                        top: 0;
                        height: 100%;
                        border-radius: 100% 0 0 100%;
                        position: absolute;
                        background-color: #3195fd
                    }
                    .progress-dot {
                        cursor: pointer;
                        top: 50%;
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 100%;
                        background-color: #3195fd;
                        transform: translate3d(0, -50%, 0);
                    }
                }
            }
        }
    }
</style>
