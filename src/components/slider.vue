<template>
    <div class="slider-wrapper" :style="sliderComponentStyle" @click="clickWrapper">
        <div class="slider">
            <div ref="dot" class="slider-dot" :style="sliderDotStyle"></div>
            <div class="slider-progress" :style="sliderProcessStyle"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slider',
    props: ['width'],
    computed: {
        sliderComponentStyle () {
            return {
                'width': this.width
            }
        },
        sliderDotStyle () {
            return {
                'transform': `translateX(29px)`
            }
        },
        sliderProcessStyle () {
            return {
                'width': '29px'
            }
        }
    },
    methods: {
        clickWrapper () {
            
        }
    }
}
</script>

<style lang="less" scoped>
.slider-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    .slider {
        position: relative;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: #6c6b70;

        .slider-dot {
            position: absolute;
            cursor: pointer;
            top: -50%;
            width: 8px;
            height: 8px;
            border-radius: 100%;
            background-color: #3195fd;
        }

        .slider-progress {
            width: 0;
            height: 100%;
            border-radius: 4px;
            background-color: #3195fd;
        }
    }
}
</style>


