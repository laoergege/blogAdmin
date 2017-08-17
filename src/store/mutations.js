import {
    TOGGLE_DRAWER, CHANGE_TYPE, TOGGLE_LIST
} from './mutation-types';

export default {
    [TOGGLE_DRAWER](state, ...change) {
        if (change[0]) {
            state.openDrawer = change[0];
        } else {
            state.openDrawer = state.openDrawer == true ? false : true;
        }
    },
    [CHANGE_TYPE](state,type) {
        state.device_type = type;
    },
    [TOGGLE_LIST](state, ...change) {
        if (change[0]) {
            state.list_show = change[0];
        } else {
            state.list_show = state.list_show == true ? false : true;
        }
    }
}

