<template>
    <div class="search-box" v-click-outside="onClickOutside">
        <div class="search-input">
            <SearchIcon class="icon" />
            <input type="text" placeholder="搜索歌曲" v-model = "keyword" @input = "search"  @focus= "search" @keyup.enter= "search">
        </div>
        <div class="search-list" v-if = "isShowSearchList" >
            <ul v-if = 'resultList.length > 0'>
                <li v-for = "audio in resultList" @click= "playAudio(audio)">{{ audio.audio_name }}</li>
            </ul>
            <p v-else>{{ searchTip }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchIcon from "../../static/img/search.svg";

export default {
    name: "search-box",
    props: ["song", "index"],
    components: {
        SearchIcon,
    },
    computed: {
        ...mapState([
            'audioList',
            'willPlayList'
        ])
    },
    data () {
        return {
            keyword: '',   // 搜索的关键字
            resultList: [],             // 搜索得到的结果列表
            searchTip: '正在搜索...',   // 搜索时的提示信息
            isShowSearchList: false
        }
    },
    methods: {
       // 搜索框input事件, keyword为关键字
        async search() {
            const keyword = this.keyword;
            if(!keyword || keyword.trim() === '') {
                this.isShowSearchList = false;
                return;
            };

            this.resultCount = 0;
            this.isShowSearchList = true;
            this.searchTip = '正在搜索...';

            try {
                const ret = await this.api.search(keyword)
    
                this.resultList = ret.data.results
    
                if (!this.resultList.length) {
                    this.searchTip = '暂无结果...';
                }
            } catch (error) {
                this.searchTip = '网络出现错误或服务不可用'
            }

        },

        onClickOutside (event) {
            this.isShowSearchList = false
        },

        playAudio (curAudio) {
            const index = this.willPlayList.findIndex(audio => audio._id === curAudio._id)
            if (index) {
                this.$store.commit("setCurPlayAudio", index)
            } else {
                const newAudioList = this.willPlayList.push(curAudio)
                this.$store.commit('setAudioList', newAudioList)
                this.$store.commit("setCurPlayAudio", newAudioList.length - 1)
            }
            this.$store.dispatch("playAudio")
            this.isShowSearchList = false
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "../less/mixin.less";

.search-box {
    position: relative;
    .search-input {
        height: 24px;
    }
    .search-list {
        position: absolute;
        top: 24px;

        width: 200px;
        box-shadow: 0 2px 20px -6px #777;
        border-radius: 2px;
        // border: 1px solid rgb(173, 173, 173);
        background-color: #fff;
        overflow: hidden;
        ul {
            border-radius: 2px;
            li {
                font-size: 14px;
                padding: 5px 24px 5px 24px;  
                border-bottom: 1px solid rgb(241, 241, 241);
                cursor: pointer;
                
                &:hover {
                    background-color: rgb(241, 241, 241);
                }
            }
        }

        p {
            font-size: 14px;
            padding: 5px 24px 5px 24px;   
        }
    }
}

</style>


