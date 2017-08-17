<template>
  <div>
    <mu-drawer :open="openDrawer" :docked="docked" @close="toggle()">
      <lys-host/>

      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="Menu Item 1" />
        <mu-list-item title="Menu Item 2" />
        <mu-list-item title="Menu Item 3" />
        <mu-list-item v-if="docked" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import Host from './Host';
import { mapState } from 'vuex';
import {
  TOGGLE_DRAWER
} from '../store/mutation-types';


export default {
  name: 'AppNavDrawer',
  computed: {
    ...mapState({ 
       openDrawer: 'openDrawer',
      device_type: 'device_type'
    }),
    docked() {
      return this.device_type == 2 ? true : false;
    }
  },
  components: {
    'lys-host': Host
  },
  methods: {
     toggle: function () {
      this.$store.commit(TOGGLE_DRAWER)
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../node_modules/muse-ui/less/vars.less"; // 默认基础的变量

.title {
  background-image: url('../assets/logo.png');
  background-color: @backgroundColor;
  height: 100px;
}
</style>
