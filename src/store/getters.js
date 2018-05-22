export default {
    listTotal: state => state.audioList.length,
    // curPlayFileName: state => {
    //     if(state.curPlayIndex < 0) {
    //         return '';
    //     }
    //     return state.audioList[state.curPlayIndex].FileName;
    // },
    curPlayAudio: state => {
        return state.curPlayAudio
    },
    curPlayIndex: state => {
        return state.curPlayIndex
    }
    // curPlayAudioName: state => {
    //     if(state.curPlayIndex < 0) {
    //         return '';
    //     }
    //     return state.audioList[state.curPlayIndex].audio_name;
    // }
}