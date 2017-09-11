<template>
    <div class="container" :style="{'flex-direction':  device_type == 0 ? 'column' : 'row'}">
        <div class="editor-area">
            <div class="toolbar">
                <div style="margin: 0 auto 0 0;">
                    <mu-icon-button tooltip="图片拖动到编辑区自动上传" icon="image" />
                    <mu-icon-button tooltip="撤销" icon="rotate_left" @click="undo" />
                    <mu-icon-button tooltip="恢复" icon="rotate_right" @click="redo" />
                </div>

                <mu-icon-button tooltip="保存" icon="save" @click="save" />
                <mu-icon-button tooltip="分屏预览" icon="flip" @click="togglePreview" :class="{isActived: preview}" />
                <mu-icon-button tooltip="全屏写作" icon="fullscreen" @click="toggleFullScr" :class="{isActived: fullscreen}" />
                <mu-icon-button tooltip="发布更新" icon="publish" @click="release" />
            </div>
            <div class="body" :class="{dragover: dragover}" ref="dropzone" @dragover.prevent.stop="onDragover" @dragleave.prevent.stop="onDragleave" @dragenter.prevent.stop="onDragleave" @drop.prevent.stop="onDrop($event)">
                <mu-content-block>

                    <textarea id="editor" spellcheck="false" v-model="value" ref="textarea" @keyup.prevent.stop.ctrl.90="undo" @keyup.prevent.stop.ctrl.89="redo"></textarea>
                    <input hidden type="file" name="file" id="file" />

                </mu-content-block>
            </div>
        </div>
        <div class="preview-area body" v-if="preview">
            <mu-content-block>
                <div v-html="html" class="markdown-body" ref="preview"></div>
            </mu-content-block>
        </div>
    </div>
</template>         

<script scoped>
import store from '../store/store';
import { mapState, mapActions } from 'vuex';
import {
    PREVIEW
} from '../store/mutation-types';
import { debounceTime, testImg } from '../util/util.js';
import axios from 'axios';
import config from '../config';
import hljs from '../hljs.config';
import _http from '../util/http';
const showdown = require('showdown');
const UndoManager = require('undo-manager');
import '../assets/css/dropzone.min.css';
import "../assets/js/dropzone.min.js";

export default {
    name: 'editor',
    mounted() {

    },
    data() {
        return {
            value: '',
            converter: new showdown.Converter(),
            undoManager: new UndoManager(),
            flag: '',
            dragover: false
        }
    },
    methods: {
        ...mapActions({
            togglePreview: 'preview',
            toggleFullScr: 'fullscreen'
        }),
        undo() {
            this.undoManager.undo();
        },
        redo() {
            this.undoManager.redo();
        },
        release() {
            this.currentPosts.release = true;
            this.currentPosts.wordCount = this.value.length;
            this.currentPosts.content = this.value;

            _http().post(`${config.markboos}/${this.$route.params.book}/${this.currentPosts.filename}`, this.currentPosts)
                .then(
                () => { alert('发布更新成功') },
                () => { this.$router.push({ name: 'error' }) }
                )
        },
        save() {
            if (this.currentPosts && this.value) {
                this.currentPosts.wordCount = this.value.length;
                this.currentPosts.content = this.value;

                _http().put(`${config.markboos}/${this.$route.params.book}/${this.currentPosts.filename}`, this.currentPosts)
                    .then(
                    () => { },
                    () => { this.$router.push({ name: 'error' }) }
                    )
            }
        },
        autosave() {
            this.save();
        },
        onDragover() {
            this.dragover = true;
        },
        onDragleave() {
            this.dragover = false;
        },
        onDrop(e) {
            this.dragover = false;

            let file = e.dataTransfer.files[0];

            if (testImg(file)) {
                let formdata = new FormData();
                formdata.append('image', file);

                let selectionStart = this.$refs.textarea.selectionStart;

                let start = this.value.substr(0, selectionStart);
                let end = this.value.substr(selectionStart);

                this.value = `${start}\n![image.png](image uploading......)\n${end}`;

                _http().post('/upload/images', formdata).then(
                    (res) => { this.value = `${start}\n![image.png](${config.APIADDR}/${res.data.data[0]})\n${end}`; },
                    (error) => { this.$router.push({ name: 'error' }) }
                )
            }
        },
        getContent() {
            if (this.currentPosts) {
                axios.get(`${this.currentPosts.directory}/${this.currentPosts.filename}.save.md`, {
                    baseURL: config.APIADDR,
                    responseType: 'text'
                }).then((res) => {
                    /**
                     * 本地存储 与 远程存储 比较版本
                     */
                    let local = localStorage.getItem(this.currentPosts._id);
                    if (res.data.length >= (local ? local.length : 0))
                        this.value = res.data;
                    else {
                        this.value = localStorage.getItem(this.currentPosts._id);
                    }
                });
            }
        },
        onRefresh() {
            this.autosave();
        }
    },
    watch: {
        value: function(val, oldVal) {
            (val)
            if ((val) && (val.length > this.flag.length)) {
                this.flag = val;
                this.undoManager.add({
                    undo: () => {
                        this.value = oldVal;
                    },
                    redo: () => {
                        this.value = val;
                    }
                });
            } else {
                val = ''
            }
            // 本地存储
            localStorage.setItem(this.currentPosts._id, this.value);
        },
        "$route"() {
            // 切换文章时， 自动保存
            this.autosave();
            // 请求 新的文章内容
            this.getContent();
            // 清楚 储存的操作状态
            this.undoManager.clear();
        }
    },
    computed: {
        html() {
            return this.converter.makeHtml(this.value);
        },
        ...mapState(['preview', 'fullscreen', 'device_type', 'currentPosts']),
        ...mapState({
            book: function(state) { return state.books[this.$route.params.book] || [] }
        })
    },
    created() {
        // 清楚 储存的操作状态
        this.undoManager.clear();
        // 获取 文章 内容
        this.getContent();

        // 当用户离开或刷新页面时自动保存编辑内容
        window.addEventListener("beforeunload", this.onRefresh)
    },
    updated() {
        if (this.preview) {
            // 语法高亮
            let blocks = this.$refs.preview.querySelectorAll('pre code');
            blocks.forEach((block) => {
                hljs.highlightBlock(block)
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener("beforeunload", this.onRefresh);
    },
    /******* 监听 该编辑器组件的路由变化 自动保存编辑内容   **/
    beforeRouteLeave() {
        // 切换文章时， 自动保存
        this.autosave();
        // 请求 新的文章内容
        this.getContent();
    },
    store
}

</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    /* flex-wrap: wrap; */
    /* flex-direction: column */
}

.editor-area {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    margin: 0 10px 10px;
    flex-grow: 1;
}

.preview-area {
    flex-basis: 50%;
    overflow: auto;
    margin: 10px 10px;
}

.content {
    background-color: #ffffff;
}

.toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
}

.body {
    background-color: white;
    border-radius: 5px;
    flex-grow: 1;
    flex-grow: 1;
    display: flex;
}

#editor {
    height: 100%;
    width: 100%;
    resize: none;
    font-family: Roboto, Lato, sans-serif;
    font-size: 18px;
    overflow-x: hidden;
}

textarea {
    border: none;
    outline: none;
}

.isActived {
    background-color: rgba(0, 0, 0, 0.1);
}

.dragover {
    border: 2px dashed #6a737d;
}
</style>
