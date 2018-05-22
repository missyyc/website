import api from '../api';

export default {
    playAudio({ commit, getters }) {
        commit("setIsPlayed", false);
        commit("setCurPlayAudioSrc", "");
        commit("setCurPlayImgSrc", "");
        commit("setPaused");
        commit('setLock', false);
        commit("setCurPlayLrcArr", []);
        commit('setCurLrcIndex', 0);

        console.log('getters.curPlayIndex================>', getters.curPlayIndex)
        commit('setCurPlayAudio', getters.curPlayIndex)

        const { source: {url: sourceUrl}, img: {url: imgUrl}, lyrics: {lyrics} } = getters.curPlayAudio;
        commit('setCanPlayed', true)
        commit("setCurPlayAudioSrc", `http://${sourceUrl}`)
        commit("setCurPlayImgSrc", `http://${imgUrl}`)
        commit("setCurPlayLrcArr", lyrics);
        commit("setCanPlayed", true);
    }
}