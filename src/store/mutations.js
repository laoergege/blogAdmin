import {
    TOGGLE_DRAWER, CHANGE_TYPE, TOGGLE_LIST, PREVIEW, FULLSCREEN,
    LIST_TITLE, ISLOGIN, HOST_INFO, INIT_BOOKS, ADD_BOOK, MODIFY_BOOK,
    DELETE_BOOK, CHANGE_MAIN_TITLE, ADD_POSTS
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
    },

    //文集操作
    [INIT_BOOKS](state, books) {
        state.markbooks = books;
    },
    //添加文集
    [ADD_BOOK](state, book) {
        state.markbooks.push(book);
    },
    //修改文集名
    [MODIFY_BOOK](state, book) {
        let i;
        state.markbooks.forEach(function(value,index) {
            if(value._id == book._id)
                i = index;
        });
        state.markbooks.splice(i, 1, book);
    },
    //删除文集
    [DELETE_BOOK](state, bookID) {
        let i;
        state.markbooks.forEach(function(value,index) {
            if(value._id == bookID)
                i = index;
        });
        state.markbooks.splice(i, 1);
    },
    // 添加文集 文章
    [ADD_POSTS](state, book) {
        // state.books.set(book.bookname, book.posts);
        state.books = Object.assign({}, state.books, {[book.bookname]: book.posts});
    },

    // mian
    // change title
    [CHANGE_MAIN_TITLE](state, title) {
        state.mainTitle = title;
    }
}

