<template>
  <div class="layout">
    <lys-nav/>
    <div :class="{'nav-show': openDrawer && device_type == 2}">
      <div class="content">
        <lys-list v-show="device_type != 0 || openList" />
        <lys-main v-show="device_type != 0 || !openList" />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../components/AppNavDrawer';
import List from '../components/List';
import Main from '../components/main';
import { getDeviceType } from '../util/util';
import store from '../store/store';
import { mapState, mapMutations } from 'vuex';
import {
  TOGGLE_DRAWER, CHANGE_TYPE, TOGGLE_LIST
} from '../store/mutation-types';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/debounceTime";

export default {
  created() {
    let type = getDeviceType();
    this.toggleDrawer(type < 2 ? false : true);
    this.changType(type);

    // 监听 window resize, 节流
    Observable.fromEvent(window,'resize')
              .debounceTime(200)
              .subscribe(() => {
                this.resizeHandle();
              })
  },
  computed: {
    ...mapState({
      openDrawer: 'openDrawer',
      device_type: 'device_type',
      openList: 'list_show'
    })
  },
  methods: {
    toggleDrawer: function (change = undefined) {
      this.$store.commit(TOGGLE_DRAWER, change)
    },
    ...mapMutations({
      changType: CHANGE_TYPE
    }),
    resizeHandle: function () {
      let type = getDeviceType();
      this.changType(type);

      if (type != 2 && this.openDrawer) {
        this.toggleDrawer(false);
      }
    }
  },
  components: {
    'lys-nav': Nav,
    'lys-list': List,
    'lys-main': Main
  },
  store,
  destroyed() {
    window.removeEventListener('resize', this.resizeHandle);
  }
}
</script>
<style scoped>
.layout {
  background-color: rgb(236, 236, 236);
}

.header {
  background-color: #7e57c2;
}

.logo {
  font-size: 24px;
  color: white;
  display: inline-block;
  padding: 10px 20px;
}

.nav {
  display: inline-block;
  width: calc(100% - 150px);
  margin: 0 auto;
}

.nav-show {
  padding-left: 256px;
}

.content {
  overflow: hidden;
  display: flex;
  height: 100vh;
}

.content-left {
  flex-basis: 30%;
  /* float: left; */
  background-color: white;
  margin-bottom: -4000px;
  padding-bottom: 4000px;
  flex-grow: 1;
}

.content-right {
  width: 70%;
  display: inline-block;
  /* float: right; */
  background-color: rgba(0, 0, 0, 0);
  flex-basis: 70%;
  flex-grow: 1
}

.breadcrumb {
  margin: 10px 0;
}

.footer {
  padding: 20px 0;
  text-align: center;
}
</style>