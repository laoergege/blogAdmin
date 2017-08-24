import {
    TOGGLE_DRAWER, PREVIEW, FULLSCREEN, HOST_INFO
} from '../store/mutation-types';
import _http from '../util/http';

export default {
    preview({ commit, state }) {
        commit(PREVIEW);
        commit(TOGGLE_DRAWER, !state.preview && state.device_type == 2);
        commit(FULLSCREEN, false);
    },

    fullscreen({ commit, state }) {
        commit(FULLSCREEN);
        commit(TOGGLE_DRAWER, !state.fullscreen && state.device_type == 2);
        commit(PREVIEW, false);
    },

    async login({ commit, state }, host) {
        try {
            let response = await _http.post('/auth', {
                name: host.name,
                pass: host.pass
            });

            let data = response.data.data;

            if (response.status == 200) {
                //保存 token
                localStorage.setItem('token', data.token);
                // 保存 host 信息
                commit(HOST_INFO, data.host);

                return true;
            }
        } catch (error) {
            return false;
        }
    },

    async authToken({ commit, state }) {
        try {
            let response = await _http.get('/auth/token');

            if (response.status == 200) {

                return true;
            }
        } catch (error) {
            return false;
        }
    }
}