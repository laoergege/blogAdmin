<template>
    <div class="content-right">
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
            <mu-sub-header>阳光</mu-sub-header>
            <mu-content-block>
                散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
            </mu-content-block>
        </div>
    </div>
</template>

<script>
import {
  TOGGLE_LIST
} from '../store/mutation-types';

export default {
    name: 'main',
    methods: {
        toggleList: function () {
            if(this.$store.state.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        }
    }
}
</script>

<style>
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
    min-height: 500px;
    margin: 0 20px;
}
</style>


