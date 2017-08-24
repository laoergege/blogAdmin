<template>
  <div>
    <mu-drawer :open="openDrawer" :docked="docked" @close="toggle()">
      <lys-host/>

      <mu-list>
        <mu-list-item title="消息" @click.native="changeTitle('消息')">
          <mu-icon slot="left" value="notifications" />
          <mu-badge content="4" secondary slot="after" />
        </mu-list-item>
        <mu-list-item title="文集" toggleNested :open="false">
          <mu-icon slot="left" value="collections_bookmark" />
          <mu-list-item slot="nested" :title="book" v-for="(book, index) in books" :key="index" @click.native="changeTitle(book)">
            <mu-icon slot="left" value="book" />
          </mu-list-item>
        </mu-list-item>
        <mu-list-item title="标签" @click.native="changeTitle('标签')">
          <mu-icon slot="left" value="local_offer" />
        </mu-list-item>
        <mu-list-item title="个人设置" @click.native="changeTitle('个人设置')">
          <mu-icon slot="left" value="account_circle" />
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import Host from './Host';
import { mapState, mapMutations } from 'vuex';
import {
  TOGGLE_DRAWER, LIST_TITLE
} from '../store/mutation-types';


export default {
  name: 'AppNavDrawer',
  data() {
    return {
      books: [
        'Angular', 'Vue', 'MongoDB', 'JavaScript'
      ]
    }
  },
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
    changeTitle(title) {
      this.$store.commit(LIST_TITLE, title);
      if (this.device_type != 2)
        this.toggle();
    }
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
