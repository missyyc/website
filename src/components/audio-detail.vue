<template>
    <transition name="move">
        <div v-if= "showAudioDetail" class="audio-detail" >
            <span @click="closeAudioDetail" class="collapse-btn">
                <CollapseIcon class="icon icon-collapse" />
            </span>
            <div class="audio-detail-content">
                <div class="content-btns">
                    <img class="cover-img" :src="curPlayImgSrc" alt="" />
                    <span>
                        <LoveIcon class="icon" />
                    </span>
                </div>

                <div class="content-infos">
                    <!-- <div class="audio-meta">
                        <h3>{{curPlayAudio.audio_name}}</h3>
                    </div> -->
                    <div class="lrc-stage">
                        <div class="lrc-box" ref = "lrcBox" :style = "{transform: 'translateY(-' + translateY + 'px)', color: defaultColor}">
                            <p :style = "{color: curLrcIndex === index ? activeColor : ''}" :startTime = "lrcObj.startTime" v-for = "(lrcObj, index) in curPlayLrcArr">{{ lrcObj.curLrc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import CollapseIcon from '../../static/img/collapse.svg';
import LoveIcon from "../../static/img/icon_love.svg";

export default {
    name: 'audio-detail',

    components: {
        CollapseIcon,
        LoveIcon,
    },

    data () {
        return {
            curLrcIndex: 0,                 // 当前歌词高亮行
            rollTimer: null,                // 控制歌词滚动的定时器
            translateY: 0,                  // 歌词滚动的距离
            mode: 1,                        // 初始化播放模式的数字
            modeTip: '顺序播放',             // 播放模式提示
            showModeTip: false,             // 是否显示提示
            modeSwitch: false,              // 防止连续点击
            currentImgSrc: "",              // 当前颜色的背景图
            isShowColorList: false,         // 是否显示颜色列表
            defaultColor: "",               // 当前默认所有歌词颜色
            activeColor: "",                // 当前播放所属行的歌词颜色
            endTime: 0,                     // 歌曲结束时间
            defaultColor: "",               // 当前默认所有歌词颜色
            activeColor: "",                // 当前播放所属行的歌词颜色
            lrcColorList: [                 // 歌词颜色列表数组
                {
                    defaultColor: "#b2f5b5",
                    activeColor: "#d1c90e",
                    currentImgSrc: "static/img/current-type1.png"
                },
                {
                    defaultColor: "#c1f3dc",
                    activeColor: "#33a3f5",
                    currentImgSrc: "static/img/current-type2.png"
                },
                {
                    defaultColor: "#a0f533",
                    activeColor: "#f32d2d",
                    currentImgSrc: "static/img/current-type3.png"
                },
                {
                    defaultColor: "#eff366",
                    activeColor: "#21d10e",
                    currentImgSrc: "static/img/current-type4.png"
                },
                {
                    defaultColor: "#efe8b2",
                    activeColor: "#d200d2",
                    currentImgSrc: "static/img/current-type5.png"
                }
            ]
        }
    },

    computed: {
        ...mapState([
            'audio',
            'curPlayAudio',
            'curPlayImgSrc',
            'curPlayLrcArr',
            'showAudioDetail'
        ]),

    },

    created () {
        this.initLyric();
    },

    watch: {
        paused(newPaused, oldPaused) {
            console.log('>>> paused', newPaused);
            if(newPaused) {
                this.clearTimer();
            }
            else {
                this.progressTimer = setTimeout(() => {
                    this.progressGo();
                }, 1000);
                this.rollTimer = setTimeout(() => {
                    this.lrcRoll();
                }, 100);
            }
        },
        curLrcIndex(newCurLrcIndex, oldCurLrcIndex) {
            console.log('>>> curLrcIndex', newCurLrcIndex);
            this.$store.commit('setCurLrcIndex', newCurLrcIndex);
            // if(!this.showDetail) return;

            const lrcBox = this.$refs.lrcBox;
            const lrcBoxHeight = lrcBox.offsetHeight;
            const childHeight = lrcBox.firstChild.offsetHeight;
            console.log('lrcBoxHeight, childHeight================>', lrcBoxHeight, childHeight)
            const curShowNum = Math.floor(lrcBoxHeight / childHeight);
            if(newCurLrcIndex >= curShowNum - 1) {
                this.translateY = childHeight * (newCurLrcIndex - curShowNum + 1) + childHeight * 5;
            }
            else {
                this.translateY = 0;
            }
        }
    },

    methods: {
        initLyric () {
            // this.audio.currentTime = 0;
            this.endTime = parseInt(this.audio.duration);

            this.$store.commit('setLrcColor', {
                defaultColor: this.lrcColorList[1].defaultColor,
                activeColor: this.lrcColorList[1].activeColor
            });

            this.currentImgSrc = this.lrcColorList[1].currentImgSrc;
            this.defaultColor = this.lrcColorList[1].defaultColor;
            this.activeColor = this.lrcColorList[1].activeColor;

            this.lrcRoll();
        },

        closeAudioDetail () {
            this.$store.commit('setShowAudioDetail', false)
        },

        // 歌词滚动
        lrcRoll() {
            const curPlayLrcArr = this.curPlayLrcArr;
            const currentTime = Number(this.audio.currentTime.toFixed(2));

            for(let [index, curPlayLrc] of curPlayLrcArr.entries()) {
                if(Number(curPlayLrc.startTime) >= currentTime) {
                    if(index === 0) {
                        index = 1;
                    }
                    else if(index === curPlayLrcArr.length - 1) {
                        index = curPlayLrcArr.length - 1;
                    }
                    this.curLrcIndex = index - 1;
                    break;
                }
                else {
                    this.curLrcIndex = curPlayLrcArr.length - 1;
                }
            }
            if(currentTime < this.endTime) {
                this.rollTimer = setTimeout(() => {
                    this.lrcRoll();
                }, 100);
            }
            else {
                return;
            }
        },

    },

    destroyed () {
        this.destroyed()
        console.log('destroyed================>')
    }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";
.audio-detail {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: burlywood;

        .collapse-btn {
            position: absolute;
            top: 10px;
            right: 10px;

            .icon-collapse {
                width: 20px;
                height: 20px;
            }
        }

        .audio-detail-content {
            display: flex;
            flex-direction: row;

            .content-btns {
                display: flex;
                flex-direction: column;
                padding: 50px 50px 0 50px;

                .cover-img {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: @borderRadius;
                }
            }

            .content-infos {
                padding: 50px 50px 0 150px;
                .lrc-stage {
                    overflow: hidden;
                    height: calc(720px - @musicToolBarHeight);
                    // height: 400px;
                    .lrc-box {
                        color: #fff;
                        height: 100%;
                        transition: all .5s;
                        p {
                            padding: 0.1389rem 0;
                            text-align: center;
                            .fontSize(28);
                            &.current {
                                color: #d1c90e;
                            }
                        }
                    }
                }
            }
        }
}
</style>
