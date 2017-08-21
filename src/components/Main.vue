<template>
    <div class="content-right layout">
        <mu-appbar title="Vue 生命周期" titleClass="titleClass">
            <mu-icon-button icon="arrow_back" slot="left" @click="toggleList" />
        </mu-appbar>
        <router-view></router-view>
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
            if (this.$store.state.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        }
    }
}
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
}

.titleClass {
    text-align: center!important;
}

</style>


