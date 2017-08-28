<template>
  <div class="content-left">
    <mu-appbar :title="list_title">
      <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
    </mu-appbar>
    <router-view name="left"/>
  </div>
</template>

 <script scoped>
import {
  TOGGLE_DRAWER, TOGGLE_LIST
} from '../store/mutation-types';
import { mapState } from 'vuex';
import store from '../store/store';

export default {
  name: 'list',
  computed: {
    ...mapState(['list_title'])
  },
  methods: {
    toggleDrawer: function () {
      this.$store.commit(TOGGLE_DRAWER)
    },
    toggleList: function () {
      if (this.$store.state.device_type == 0)
        this.$store.commit(TOGGLE_LIST)
    }
  },
  store
}
</script>

<style scoped>

</style>

