export default {
    audioList: [],               // 歌曲列表数组
    willPlayList: [],           // 即将播放的歌曲列表
    searchCount: 0,             // 搜索结果歌曲的数量
    showDetail: false,          // 是否显示详情页
    hasMask: false,             // 是否有蒙层  
    audio: null,                // audio的dom节点
    isPlayed: false,            // 是否有音乐在播放
    canPlayed: false,           // 是否可以播放音乐
    paused: false,              // 音频是否为暂停状态
    curPlayIndex: -1,           // 当前播放歌曲的索引
    curPlayAudio: {},            // 当前播放音频
    curPlayAudioSrc: "",         // 当前播放音频的url
    curPlayImgSrc: "",          // 歌手图片来源, 默认值
    showAlbumDetail: false,      // 显示专辑详情
    showAudioDetail: false,       // 显示歌曲详情
    curAlbum: {},               // 当前专辑
    curAlbumImgSrc: "",         // 专辑图片
    curPlayLrcArr: [],          // 歌词数组
    lock: false,                // 事件开关, 防止canplay事件多次执行
    loop: false,                // 歌曲是否循环播放
    modeType: 'order',          // 播放模式
    curLrcIndexFlag: 0,             // 当前播放歌曲所播放到的当前歌词行      
    lrcSwitch: false,           // 是否显示悬浮歌词
    lrcColor: {
        defaultColor: "#b2f5b5",
        activeColor: "#d1c90e"
    }
}