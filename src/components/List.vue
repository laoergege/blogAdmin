<template>
  <div class="content-left">
    <mu-appbar title="blog-admin">
      <mu-icon-button icon="menu" slot="left" @click="toggleDrawer" />
    </mu-appbar>
    <mu-list>
      <mu-list-item title="Sent mail" value="list1" @click="toggleList">
        <mu-icon slot="left" value="send" />
      </mu-list-item>
      </mu-list-item>
    </mu-list>
  </div>
</template>

 <script scoped>
import {
  TOGGLE_DRAWER, TOGGLE_LIST
} from '../store/mutation-types';

export default {
  name: 'list',
  methods: {
    toggleDrawer: function () {
      this.$store.commit(TOGGLE_DRAWER)
    },
    toggleList: function () {
      if(this.$store.state.device_type == 0)
      this.$store.commit(TOGGLE_LIST)
    }
  }
}
</script>
