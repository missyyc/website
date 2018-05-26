// 统一管理各个请求
import axios from 'axios';

const apiUrl = 'http://api.yangyangchong.com/api/v1'
// const apiUrl = 'http://localhost:5000/api/v1'

// axios.defaults.baseURL = apiUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const getToken = () => {
    return window.localStorage.getItem('yyc-token')
}

export default {
    
    // ===============yyc api==================
    async fetchAudioList(type) {
        try {
            let url = null
            if (type) {
                url = `${apiUrl}/audios/list?type=${type}`
            } else {
                url = `${apiUrl}/audios/list`
            }
            return await axios.get(url)
        } catch (error) {
            return error
        }
    },

    async fetchAlbumsList() {
        try {
            return await axios.get(`${apiUrl}/albums/list`)
        } catch (error) {
            return error
        }
    },

    async getToken () {
        try {
            return await axios.post('/auth', {
                username: 'admin',
                password: 'yyc'
            })
        } catch (error) {
            return error
        }
    },

    // 根据关键字搜索
    async search(keyword) {
        try {
            return await axios.get(`${apiUrl}/search?keyword=${keyword}`)
        } catch (error) {
            return error
        }
    },

    async addPlayCount({audioId, play_times}) {
        try {
            return await axios({
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${getToken()}`
                },
                url: `${apiUrl}/audios/update/${audioId}`,
                data: {play_times}
            })
        } catch (error) {
            
        }
    },
    async addLoveCount({audioId, love_times}) {
        try {
            return await axios({
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${getToken()}`
                },
                url: `${apiUrl}/audios/update/${audioId}`,
                data: {love_times}
            })
        } catch (error) {
            
        }
    }
}