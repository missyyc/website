import api from '../api';
import * as storage from '../utils/storage'

export default {
    playAudio({ commit, dispatch, getters }) {
        commit("setIsPlayed", false);
        commit("setCurPlayAudioSrc", "");
        commit("setCurPlayImgSrc", "");
        commit("setPaused");
        commit('setLock', false);
        commit("setCurPlayLrcArr", []);
        commit('setCurLrcIndex', 0);

        commit('setCurPlayAudio', getters.curPlayIndex)

        const curPlayAudio = getters.curPlayAudio;
        const { audio_name, cover_singer, source: {url: sourceUrl}, img: {url: imgUrl} } = curPlayAudio

        // 设置网页的title
        document.title = `${audio_name}-${cover_singer}`

        commit('setCanPlayed', true)
        commit("setCurPlayAudioSrc", `http://${sourceUrl}`)
        commit("setCurPlayImgSrc", `http://${imgUrl}`)

        if (curPlayAudio.lyrics) {
            const { lyrics } = curPlayAudio.lyrics
            commit("setCurPlayLrcArr", lyrics);
        }
        commit('setCanPlayed', true);
        dispatch('addPlayCount')
    },

    async setToken({commit, getters}) {
        const ret = await api.getToken()
        window.localStorage.setItem('yyc-token', ret.data.token)
    },

    async addPlayCount({ commit, getters }) {
        let { _id: audioId, play_times } = getters.curPlayAudio
        play_times += 1

        let playedAudiosIds = null
        playedAudiosIds = storage.getYycPlayedAudios()
        if (!playedAudiosIds) {
            playedAudiosIds = []
        }
        const index = playedAudiosIds.findIndex(_id => _id === audioId)

        if (index >= 0) {
            return
        } else {
            commit('addCurAudioPlayCount')
            playedAudiosIds.push(audioId)
            storage.setYycPlayedAudios(playedAudiosIds)
            const ret = await api.addPlayCount({audioId, play_times})
        }
    },

    async addLoveCount({commit, getters}, audio) {
        let { _id: audioId, love_times } = audio
        love_times += 1

        let lovedAudiosIds = null
        lovedAudiosIds = storage.getYycLovedAudios()
        if (!lovedAudiosIds) {
            lovedAudiosIds = []
        }
        const index = lovedAudiosIds.findIndex(_id => _id === audioId)

        if (index >= 0) {
            return
        } else {
            commit('addCurAudioLoveCount', audio)
            lovedAudiosIds.push(audioId)
            storage.setYycLovedAudios(lovedAudiosIds)
            const ret = await api.addLoveCount({audioId, love_times})
        }
    }
}