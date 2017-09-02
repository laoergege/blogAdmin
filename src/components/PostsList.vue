<template>
    <div :key="this.$route.params.book">
        <mu-list>
            <mu-list-item title="新建文章" @click="onDialogFORnew">
                <mu-icon slot="left" value="add" />
            </mu-list-item>
            <mu-list-item :title="post.title" v-for="(post, i) in book" :key="i" @click="goArtcle(post,index)">
                <mu-icon slot="left" value="book" />
                <mu-icon-menu slot="right" icon="more_vert" @click.native="$event.stopPropagation()">
                    <mu-menu-item title="删除文章" @click="(target = post) && (dialogFORdel = true) && (index = i)" />
                    <mu-menu-item title="修改名称" @click="onDialogFORModify(post, i)" />
                </mu-icon-menu>
            </mu-list-item>
        </mu-list>

        <mu-dialog :open="dialogFORnew" title="新建文章" @close="close">
            <mu-text-field icon="book" :errorText="errorText" @input="onInput($event)" /><br/>

            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmitForNew" label="确定" />
        </mu-dialog>

        <mu-dialog :open="dialogFORdel" title="删除文章" @close="close" bodyClass="warning">
            <h3>你确定删除 {{target.title}} 文集以及该文集的所有文章?</h3>
            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmitForRemove" label="确定" />
        </mu-dialog>

        <mu-dialog :open="dialogFORModify" title="修改文章名称" @close="close">
            <mu-text-field icon="book" :errorText="errorText" @input="onInput($event)" v-model="target.title" /><br/>

            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmitFORname" label="确定" />
        </mu-dialog>
    </div>
</template>

<script>
import {
    LIST_TITLE, CHANGE_MAIN_TITLE, TOGGLE_LIST, INIT_POSTS,
    MODIFY_POSTS, ADD_POSTS, DELETE_POSTS
} from '../store/mutation-types';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';
import _http from '../util/http';
import config from '../config';
import { current_book } from '../util/util'

const t = {
    title: ''
}

export default {
    name: 'postsList',
    data() {
        return {
            dialogFORnew: false,
            dialogFORdel: false,
            dialogFORModify: false,
            errorText: '',
            target: t,
            index: 10000
        }
    },
    computed: {
        ...mapState({
            book: function(state) { return state.books[this.$route.params.book] },
            "device_type": "device_type",
            currentPosts: "currentPosts",
            "current_book": (state) => {
                return current_book(state);
            },
            books: "books"
        })
    },
    methods: {
        ...mapActions({
            getArticles: 'getArticles'
        }),
        goArtcle(post, index) {
            // this.$router.push({ name: 'editor', params: { book: this.$route.params.book, article: post.title } });
            this.$router.push({ path: `/home/${this.$route.params.book}/${post.title}` });
            this.$store.commit(CHANGE_MAIN_TITLE, post.title);
            this.$store.commit(INIT_POSTS, post);

            if (this.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        },
        close() {
            this.dialogFORnew = false;
            this.dialogFORdel = false;
            this.dialogFORModify = false;
            this.target = t;
            this.index = 10000;
            this.errorText = '';
            this.$store.commit(INIT_POSTS, null);
        },
        onDialogFORnew() {
            this.dialogFORnew = true;

             let newposts = {
                title: '',
                directory: `/books/${this.$route.params.book}`,
                release: false,
                bookID: this.current_book,
                content: '',
                create_at: Date.now()
            }

            this.$store.commit(INIT_POSTS, newposts);
        },
        onDialogFORModify(posts, i) {
            this.dialogFORModify = true;
            this.index = i;
            this.target = posts;

            this.$store.commit(INIT_POSTS, posts);
        },
        onInput(value = '') {
            if (value.trim().length == 0)
                this.errorText = '不能为空';
            else {
                this.errorText = '';
                if(this.currentPosts)
                    this.$store.commit(MODIFY_POSTS, { key: 'title', value: value })
            }
        },
        onSubmitForNew() {

            if (!this.errorText) {
                _http.post(`/markbooks/${this.current_book}`, this.currentPosts)
                    .then(
                    (res) => {
                        this.$store.commit(ADD_POSTS, { bookname: this.$route.params.book, posts: res.data.data });
                        this.close();
                    },
                    () => { this.$router.push({ name: 'error' }) }
                    )
            }
        },
        onSubmitForRemove() {
            if (!this.errorText) {
                _http.delete(`/markbooks/${this.$route.params.book}/${this.target.filename}`)
                    .then(
                    (res) => {
                        this.$store.commit(DELETE_POSTS, { bookname: this.$route.params.book, index: this.index });
                        this.close();
                    },
                    () => { this.$router.push({ name: 'error' }) }
                    )
            }
        },
        onSubmitFORname() {

            if (!this.errorText) {
                _http.put(`/markbooks/${this.$route.params.book}/${this.target.filename}/title`, this.currentPosts)
                    .then(
                    (res) => {
                        this.book[this.index] = this.target
                        this.close();
                    },
                    () => { this.$router.push({ name: 'error' }) }
                    )
            }
        }
    },
    watch: {
        async '$route'() {
            if (this.book.length == 0)
                await this.getArticles(this.$route.params.book)
        }
    },
    async created() {
        this.$store.commit(LIST_TITLE, this.$route.params.book);

        if (this.book.length == 0) {
            (1)
            await this.getArticles(this.$route.params.book)
        }
    },
    store
}
</script>

<style>
.warning {
    color: brown!important;
}
</style>
