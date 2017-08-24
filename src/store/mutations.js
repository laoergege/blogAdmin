import {
    TOGGLE_DRAWER, CHANGE_TYPE, TOGGLE_LIST, PREVIEW, FULLSCREEN,
    LIST_TITLE, ISLOGIN, HOST_INFO
} from './mutation-types';
import Vue from 'vue';

export default {
    [TOGGLE_DRAWER](state, ...change) {
        if (change[0] != null) {
            state.openDrawer = change[0];
        } else {
            state.openDrawer = state.openDrawer == true ? false : true;
        }
    },
    [CHANGE_TYPE](state, type) {
        state.device_type = type;
    },
    [TOGGLE_LIST](state, ...change) {
        if (change[0] != null) {
            state.list_show = change[0];
        } else {
            state.list_show = state.list_show == true ? false : true;
        }
    },
    [PREVIEW](state, ...change) {
        if (change[0] != null) {
            state.preview = change[0];
        } else {
            state.preview = state.preview == true ? false : true;
        }
    },
    [FULLSCREEN](state, ...change) {
        if (change[0] != null) {
            state.fullscreen = change[0];
        } else {
            state.fullscreen = state.fullscreen == true ? false : true;
        }
    },
    [LIST_TITLE](state, title) {
        state.list_title = title;
    },
    [ISLOGIN](state, islogin) {
        state.islogin = islogin;
    },
    [HOST_INFO](state, host) {
        Vue.set(state, 'host', host);
    }
}

