<template>
    <div>
        <mu-list>
            <mu-list-item title="新建文章">
                <mu-icon slot="left" value="add" />
            </mu-list-item>
            <mu-list-item :title="post.title" v-for="(post, index) in book" :key="index" 
                @click="goArtcle(post,index)">
                <mu-icon slot="left" value="book" />
                <mu-icon-menu slot="right" icon="more_vert" @click.native="$event.stopPropagation()">
                    <mu-menu-item title="删除文章"  />
                    <mu-menu-item title="修改名称" />
                </mu-icon-menu>
            </mu-list-item>
        </mu-list>

        <!-- <mu-dialog :open="dialogFORnew" title="新建文集" @close="close">
            <mu-text-field icon="book" :errorText="errorText" @input="onInput($event)" /><br/>

            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmit" label="确定" />
        </mu-dialog>

        <mu-dialog :open="dialogFORdel" title="删除文集" @close="close" bodyClass="warning">
            <h3>你确定删除 {{delBook.bookname}} 文集以及该文集的所有文章?</h3>
            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="remove" label="确定" />
        </mu-dialog>

        <mu-dialog :open="dialogFORalter" title="修改文集名称" @close="close">
            <mu-text-field icon="book" :errorText="errorText" @input="onInput($event)" v-model="newname" /><br/>

            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmitFORname" label="确定" />
        </mu-dialog> -->
    </div>
</template>

<script>
import {
    LIST_TITLE, CHANGE_MAIN_TITLE, TOGGLE_LIST, INIT_POSTS
} from '../store/mutation-types';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';

export default {
    name: 'postsList',
    computed: {
        ...mapState({
            book: function(state) { return state.books[this.$route.params.book]},
            "device_type": "device_type" 
        })
    },
    methods: {
        ...mapActions({
            getArticles: 'getArticles'
        }),
        goArtcle(post,index) {
            this.$router.push({name: 'editor', params: {book: this.$route.params.book, article: post.title }});
            this.$store.commit(CHANGE_MAIN_TITLE, post.title);
            this.$store.commit(INIT_POSTS, post);

            if(this.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        }
    },
    async created() {
        this.$store.commit(LIST_TITLE, this.$route.params.book);

        if(!this.book){
            console.log(1)
            await this.getArticles(this.$route.params.book)
        }
    },
    store
}
</script>
