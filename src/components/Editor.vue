<template>
    <div class="container">
        <div class="editor-area">
            <div class="toolbar">
                <div style="margin: 0 auto 0 0;">
                    <mu-icon-button tooltip="图片" icon="image" />
                    <mu-icon-button tooltip="撤销" icon="rotate_left" @click="undo" />
                    <mu-icon-button tooltip="恢复" icon="rotate_right" @click="redo" />
                </div>

                <mu-icon-button tooltip="保存" icon="save" />
                <mu-icon-button tooltip="分屏预览" icon="flip" @click="togglePreview" :class="{isActived: preview}" />
                <mu-icon-button tooltip="全屏写作" icon="fullscreen" @click="toggleFullScr" :class="{isActived: fullscreen}" />
                <mu-icon-button tooltip="发布更新" icon="publish" />
            </div>
            <div class="body">
                <mu-content-block>
                    <textarea id="editor" v-model="value" ref="textarea" @keyup.ctrl.90="undo" @keyup.ctrl.89="redo" @input="onInput"></textarea>
                </mu-content-block>
            </div>
        </div>
        <div class="preview-area body" v-show="preview">
            <mu-content-block>
                <div v-html="html" class="modest" ref="preview"></div>
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
import { debounceTime } from '../util/util.js';
const showdown = require('showdown');
const Undo = require('undo');

export default {
    name: 'editor',
    mounted() {

    },
    data() {
        return {
            value: '',
            converter: new showdown.Converter(),
            stack: new Undo.Stack(),
            EditCommand: Undo.Command.extend({
                constructor: function (textarea, oldValue, newValue) {
                    this.textarea = textarea;
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                },
                execute: function () {
                },
                undo: function () {
                    this.textarea.html(this.oldValue);
                },

                redo: function () {
                    this.textarea.html(this.newValue);
                }
            });
        }
    },
    methods: {
        ...mapActions({
            togglePreview: 'preview',
            toggleFullScr: 'fullscreen'
        }),
        undo(e) {
            if (this.flag != 0) {
                this.value = this.recordes[--this.flag];
            }
        },
        redo(e) {
            if (this.flag < (this.recordes.length - 1)) {
                this.value = this.recordes[++this.flag];
            }
        },
        onInput() {
            if (this.flag < (this.recordes.length - 1))
                this.recordes[++this.flag] = this.value;
            else {
                this.recordes.push(this.value);
                this.flag++;
            }
        }
    },
    computed: {
        html() {
            return this.converter.makeHtml(this.value);
        },
        ...mapState(['preview', 'fullscreen'])
    },
    store
}

</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
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
}

textarea {
    border: none;
    outline: none;
}

.isActived {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
