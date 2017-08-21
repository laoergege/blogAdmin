<template>
    <div class="container">
        <div class="editor-area">
            <div class="toolbar">
                <div style="margin: 0 auto 0 0;">
                    <mu-icon-button tooltip="图片" icon="image" />
                    <mu-icon-button tooltip="撤销" icon="rotate_left" @click="revoke"/>
                    <mu-icon-button tooltip="恢复" icon="rotate_right" @click="recovery"/>
                </div>

                <mu-icon-button tooltip="保存" icon="save" />
                <mu-icon-button tooltip="分屏预览" icon="flip" @click="togglePreview" :class="{isActived: preview}" />
                <mu-icon-button tooltip="全屏写作" icon="fullscreen" @click="toggleFullScr" :class="{isActived: fullscreen}"/>
                <mu-icon-button tooltip="发布更新" icon="publish" />
            </div>
            <div class="body">
                <mu-content-block>
                    <textarea id="editor" v-model="value" ref="textarea"></textarea>
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
const showdown  = require('showdown');

export default {
    name: 'editor',
    mounted() {
        // debounceTime(this.$refs.textarea,'change',200,() => {
        //     this.html = this.converter.makeHtml(this.value);
        // })

       
    },
    data() {
        return {
            value: '',
            converter: new showdown.Converter(),
            records: [],
            recoveryVal: []
        }
    },
    methods: {
        ...mapActions({
            togglePreview: 'preview',
            toggleFullScr: 'fullscreen'
        }),
        revoke() {
            if(this.records.length != 0 ){
                this.recoveryVal.push(this.records.pop());
                this.value = this.recoveryVal[this.recoveryVal.length - 1];
            }
        },
        recovery() {
             if(this.recoveryVal.length != 0
             ){
                 this.value = this.recoveryVal.pop();
             }
        }
    },
    watch: {
        value: function (val, oldValue) {
            this.records.push(val);
        }
    },
    computed: {
        html() {
            return this.converter.makeHtml(this.value);
        },
        ...mapState(['preview','fullscreen'])
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
