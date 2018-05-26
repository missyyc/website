export default {
    listTotal: state => state.audioList.length,
    curPlayAudio: state => {
        return state.curPlayAudio
    },
    curPlayIndex: state => {
        return state.curPlayIndex
    },
    songsList: state=> {
        console.log('state.audioList================>', state.audioList)
        return state.audioList.filter(audio => audio.type === 'song')
    },  
    liveAudiosList: state=> {
        return state.audioList.filter(audio => audio.type === 'live_audio')
    }    
}