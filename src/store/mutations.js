export default {
    setAudioList(state, audioList) {
        state.audioList = audioList;
    },
    setWillPlayList(state, list) {
        state.willPlayList = list
    },
    setSearchCount(state, searchCount) {
        state.searchCount = searchCount;
    },
    setShowDetail(state, showDetail) {
        state.showDetail = showDetail;
    },
    setAudio(state, audio) {
        state.audio = audio;
    },
    setIsPlayed(state, isPlayed) {
        state.isPlayed = isPlayed;
    },
    setCanPlayed(state, canPlayed) {
        state.canPlayed = canPlayed;
    },
    addCurAudioPlayCount(state) {
        state.curPlayAudio.play_times += 1
    },
    addCurAudioLoveCount(state, audio) {
        audio.love_times += 1
    },
    setPaused(state) {
        if(!state.curPlayAudioSrc) {
            state.paused = false;
            return;
        }
        state.paused = !state.paused;
        if(state.paused) {
            state.audio.pause();
        }
        else {
            state.audio.play();
        }
    },
    setHasMask(state, value) {
        state.hasMask = value
    },
    setCurPlayIndex(state, curPlayIndex) {
        const listTotal = state.willPlayList.length;
        if(curPlayIndex < 0) {
            curPlayIndex = listTotal - 1;
        }
        else if(curPlayIndex >= listTotal) {
            curPlayIndex = 0;
        }
        state.curPlayIndex = curPlayIndex;
    },
    setCurPlayAudio(state, curPlayIndex) {
        const curPlayAudio = state.willPlayList[curPlayIndex]
        state.curPlayAudio = curPlayAudio

        const listTotal = state.willPlayList.length;
        if(curPlayIndex < 0) {
            curPlayIndex = listTotal - 1;
        }
        else if(curPlayIndex >= listTotal) {
            curPlayIndex = 0;
        }
        state.curPlayIndex = curPlayIndex;
    },
    setCurPlayAudioSrc(state, audioSrc) {
        state.curPlayAudioSrc = audioSrc;
    },
    setCurPlayImgSrc(state, curPlayImgSrc) {
        state.curPlayImgSrc = curPlayImgSrc;
    },
    setCurAlbum(state, album) {
        state.curAlbum = album
        state.curAlbumImgSrc = `http://${album.img.url}`
    },
    setCurPlayLrcArr(state, lyrics) {
        if(lyrics.length === 0) {
            return;
        }
        const lrc = lyrics.replace(/\n/g, "").split("[").slice(1);
        const curPlayLrcArr = [];
        for(const [index, item] of lrc.entries()) {
            const times = item.split("]")[0].replace(".", ":").split(":");
            const time = Number(times[0]) * 60 + Number(times[1]) + Number(times[2]) / 1000;
            const obj = {
                index,
                startTime: time.toFixed(2),
                curLrc: item.split("]")[1]
            }
            curPlayLrcArr.push(obj);
        }
        state.curPlayLrcArr = curPlayLrcArr;
    },
    setLock(state, lock) {
        state.lock = lock;
    },
    setLoop(state, loop) {
        state.loop = loop;
    },
    setModeType(state, modeType) {
        state.modeType = modeType;
        window.localStorage.modeType = modeType;
    },
    setCurLrcIndex(state, curLrcIndex) {
        state.curLrcIndexFlag = curLrcIndex;
    },
    setLrcColor(state, lrcColor) {
        state.lrcColor = lrcColor;
    },
    setLrcSwitch(state, lrcSwitch) {
        state.lrcSwitch = lrcSwitch;
        window.localStorage.lrcSwitch = lrcSwitch;
    },
    setShowAlbumDetail(state, show) {
        state.showAlbumDetail = show
    },
    setShowAudioDetail(state, show) {
        state.showAudioDetail = show
    }
}