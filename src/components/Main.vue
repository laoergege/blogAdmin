<template>
    <div class="content-right layout">
        <mu-appbar title="Vue 生命周期" titleClass="titleClass">
            <mu-icon-button icon="arrow_back" slot="left" @click="toggleList"/>
        </mu-appbar>
        <div class="toolbar">
            <mu-icon-button tooltip="保存" icon="save" />
            <mu-icon-button tooltip="分屏预览" icon="flip" />
            <mu-icon-button tooltip="全屏写作" icon="fullscreen" />
            <mu-icon-button tooltip="发布更新" icon="publish" />
        </div>
        <div class="body">
            <mu-content-block style="height:100%">
                <editor></editor>
            </mu-content-block>
        </div>
    </div>
</template>

<script>
import {
  TOGGLE_LIST
} from '../store/mutation-types';
import Editor from './Editor';

export default {
    name: 'main',
    methods: {
        toggleList: function () {
            if(this.$store.state.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        }
    },
    components: {
        editor: Editor
    }
}
</script>

<style scoped>
.layout{
    display: flex;
    flex-direction: column;
}

.toolbar {
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
}

.titleClass {
    text-align: center!important;
}

.body {
    background-color: white;
    border-radius: 5px;
    flex-grow: 1;
    margin: 0 20px 10px;
}
</style>


