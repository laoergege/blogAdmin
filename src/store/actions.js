import {
    TOGGLE_DRAWER, PREVIEW, FULLSCREEN, HOST_INFO, INIT_BOOKS,
    ADD_BOOK, MODIFY_BOOK, DELETE_BOOK, ADD_POSTS, ADD_TAG, REMOVE_TAG,
    CHANGE_READCOUNT
} from '../store/mutation-types';
import _http from '../util/http';
import config from '../config';
import router from '../router';

/**
    * 获取 markbooks
    * @param {*} param0 
    */
const getBooks = async ({ commit, state }) => {
    try {
        let res = await _http().get(config.markboos);

        let books = res.data.data;

        commit(INIT_BOOKS, books);

        return books;
    } catch (error) {
        router.push({ name: 'error' });
    }
};

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
            let response = await _http().post('/auth', {
                name: host.name,
                pass: host.pass
            });

            let data = response.data.data;

            //保存 token
            localStorage.setItem('token', data.token);
            // 保存 host 信息
            commit(HOST_INFO, data.host);

            state.islogin = true;

            return true;

        } catch (error) {
            return false;
        }
    },

    async authToken({ commit, state }) {
        try {
            let response = await _http().get('/auth/token');

            if (response.status == 200) {

                return true;
            }
        } catch (error) {
            return false;
        }
    },

    getBooks,

    /**
     * 添加文集
     * @param {*} param0 
     */
    async addBook({ commit, state }, title) {
        try {
            let response = await _http().post(config.markboos, {
                bookname: title
            });

            if (response.status == 200) {
                commit(ADD_BOOK, response.data.data);
                return true;
            }
        } catch (error) {
            (error);
            router.push({ name: 'error' });
        }
    },

    /**
     * 修改文集名
     * @param {*} param0 
     * @param {*} book 
     */
    async modifyBook({ commit, state }, book) {
        try {
            let response = await _http().put(config.markboos, {
                book: book
            });

            if (response.status == 200) {
                commit(MODIFY_BOOK, response.data.data);
                return true;
            }
        } catch (error) {
            console.log(error);
            router.push({ name: 'error' });
        }
    },

    /**
     * 删除文集
     * @param {*} param0 
     * @param {*} book 
     */
    async deleteBook({ commit, state }, bookID) {
        try {
            let response = await _http().delete(`${config.markboos}/${bookID}`)

            if (response.status == 200) {
                commit(DELETE_BOOK, bookID);
                return true;
            }
        } catch (error) {
            router.push({ name: 'error' });
        }
    },

    /**
     * 获取该文集中所有文章
     * @param {*} param0 
     * @param {*} bookname 
     */
    async getArticles({ commit, state }, bn) {
        try {

            if (state.markbooks.length == 0) {
                await getBooks({ commit, state });
            }

            let bookID = '';
            for ({ _id, bookname } of state.markbooks) {
                if (bn == bookname) {
                    bookID = _id;
                    break;
                }
            }

            let response = await _http().get(`${config.markboos}/${bookID}`);

            if (response.status == 200) {
                for (let posts of response.data.data) {
                    commit(ADD_POSTS, { bookname: bookname, posts: posts });
                }
                return true;
            }
        } catch (error) {
            router.push({ name: 'error' });
        }
    },

    /**
     * 添加标签
     * @param {*} param0 
     * @param {*} bn 
     */
    async addTag({ commit, state }, { book, articleID, tag }) {
        try {
            let response = await _http().put(`/markbooks/${book}/${articleID}/tags/${tag}`);

            if (response.status == 200) {
                commit(ADD_TAG, tag);
            }

            return true;
        } catch (error) {
            router.push({ name: 'error' });
        }
    },

    /**
     * 删除标签
     * @param {*} param0 
     * @param {*} bn 
     */
    async removeTag({ commit, state }, { book, articleID, tag, index }) {
        try {
            let response = await _http().delete(`/markbooks/${book}/${articleID}/tags/${tag}`);

            if (response.status == 200) {
                commit(REMOVE_TAG, index);
            }

            return true;
        } catch (error) {
            router.push({ name: 'error' });
        }
    },


    /**
     * 文章置顶
     * @param {*} param0 
     * @param {*} param1 
     */
    async topArticle({ commit, state }, { book, articleID, index }) {
        try {
            let response = await _http().put(`/markbooks/${book}/${articleID}/readCount/top`);

            if (response.status == 200) {
                commit(CHANGE_READCOUNT, {bookname: book, index: index, count: response.data.data.readCount});
            }

        } catch (error) {
            console.log(error)
            router.push({ name: 'error' });
        }
    }
}