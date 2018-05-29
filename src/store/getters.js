export default {
    listTotal: state => state.audioList.length,
    audio: state => {
        return state.audio
    },
    curPlayAudio: state => {
        return state.curPlayAudio
    },
    curPlayIndex: state => {
        return state.curPlayIndex
    },
    songsList: state=> {
        return state.audioList.filter(audio => audio.type === 'song')
    },  
    liveAudiosList: state=> {
        return state.audioList.filter(audio => audio.type === 'live_audio')
    }    
}