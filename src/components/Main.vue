<template>
    <div class="content-right layout">
        <mu-appbar :title="mainTitle" titleClass="titleClass">
            <mu-icon-button icon="arrow_back" slot="left" @click="toggleList" />
        </mu-appbar>
        <router-view name="right" />
    </div>
</template>

<script>
import {
    TOGGLE_LIST, CHANGE_MAIN_TITLE
} from '../store/mutation-types';
import { mapState } from 'vuex';
import store from '../store/store';

export default {
    name: 'main',
    computed: {
        ...mapState(['mainTitle'])
    },
    methods: {
        toggleList: function() {
            if (this.$store.state.device_type == 0)
                this.$store.commit(TOGGLE_LIST);
        }
    },
    created() {
        // if (!this.mainTitle) {
        //     let path = this.$route.fullPath.split('/');
        //     this.$store.commit(CHANGE_MAIN_TITLE, path[path.length - 1])
        // }
    },
    store
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


