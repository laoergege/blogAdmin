import {
    TOGGLE_DRAWER, PREVIEW, FULLSCREEN
} from '../store/mutation-types';

export default {
    preview({ commit, state }) {
        commit(PREVIEW);
        commit(TOGGLE_DRAWER, !state.preview && state.device_type == 2);
        commit(FULLSCREEN, false);
    },
    fullscreen({ commit, state }) {
        commit(FULLSCREEN);
        commit(TOGGLE_DRAWER, !state.fullscreen && state.device_type == 2);
        commit(PREVIEW,false);
    }
}