<template>
    <div>
        <mu-list>
            <mu-list-item title="新建文集" @click="newBook">
                <mu-icon slot="left" value="add" />
            </mu-list-item>
            <mu-list-item :title="book.bookname" v-for="(book, index) in markbooks" :key="index"
                @click="goBook(book)">
                <mu-icon slot="left" value="book" />
                <mu-icon-menu slot="right" icon="more_vert" @click.native="$event.stopPropagation()">
                    <mu-menu-item title="删除文集" @click="del(book)"/>
                    <mu-menu-item title="修改名称" @click="alter(book)"/>
                </mu-icon-menu>
            </mu-list-item>
        </mu-list>

        <mu-dialog :open="dialogFORnew" title="新建文集" @close="close">
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
            <mu-text-field icon="book" :errorText="errorText" @input="onInput($event)" v-model="newname"/><br/>

            <mu-flat-button slot="actions" @click="close" primary label="取消" />
            <mu-flat-button slot="actions" primary @click="onSubmitFORname" label="确定" />
        </mu-dialog>
    </div>
</template>

<script>
import {
    LIST_TITLE
} from '../store/mutation-types';
import { mapState, mapActions } from 'vuex';
import store from '../store/store';

export default {
    name: 'bookslist',
    data() {
        return {
            dialogFORnew: false,
            dialogFORdel: false,
            dialogFORalter: false,
            title: '',
            errorText: '',
            delBook: {_id:'', bookname: ''},
            alterBook: null,
            newname: ''
        }
    },
    computed: {
        ...mapState(['markbooks'])
    },
    methods: {
        changeTitle(title) {
            this.$store.commit(LIST_TITLE, title);
        },
        newBook() {
            this.dialogFORnew = true;
        },
        close() {
            this.dialogFORnew = false;
            this.dialogFORdel = false;
            this.dialogFORalter = false;

            this.errorText = '';
            this.delBook = '';
            this.alterBook = null;
        },
        onInput(value = '') {
            if (value.trim().length == 0)
                this.errorText = '不能为空';
            else {
                this.errorText = '';
                this.title = value;
            }
        },
        del(book) {
            this.dialogFORdel = true;
            this.delBook = book;
        },
        alter(book) {
            this.dialogFORalter = true;
            this.alterBook = book;
        },
        ...mapActions({
            addBook: 'addBook',
            modifyBook: 'modifyBook',
            deleteBook: 'deleteBook'
        }),
        async onSubmit() {
            if (!this.errorText) {
                this.addBook(this.title).then(
                    () => { this.close(); }
                );
            }
        },
        async onSubmitFORname(newname) {
            if (!this.errorText) {
                this.modifyBook({_id: this.alterBook._id, bookname: this.newname}).then(
                    () => { this.close(); }
                );
            }
        },
        async remove() {
            this.deleteBook(this.delBook._id).then(
                () => { this.close(); }
            )
        },
        goBook(book) {
            this.$router.push(book.bookname);
        }
    },
    created() {
         this.changeTitle('文集');
    },
    store
}
</script>

<style>
.warning{
    color:brown!important;
}
</style>


