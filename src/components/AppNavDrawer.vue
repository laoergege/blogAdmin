<template>
  <div>
    <mu-drawer :open="openDrawer" :docked="docked" @close="toggle()">
      <lys-host/>

      <mu-list>
        <mu-list-item title="文集" toggleNested :open="true">
          <mu-icon slot="left" value="collections_bookmark" />
          <mu-list-item slot="nested" title="所有文集" @click="goAllBook">
            <mu-icon slot="left" value="collections_bookmark" />
          </mu-list-item>
          <mu-list-item slot="nested" :title="book.bookname" v-for="(book, index) in markbooks" :key="index" @click.native="goBook(book.bookname)">
            <mu-icon slot="left" value="book" />
          </mu-list-item>
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
import { mapState, mapMutations, mapActions } from 'vuex';
import {
  TOGGLE_DRAWER, LIST_TITLE, CHANGE_MAIN_TITLE
} from '../store/mutation-types';
import _http from "../util/http"
import config from "../config"

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
      device_type: 'device_type',
      markbooks: 'markbooks',
      currentPosts: 'currentPosts'
    }),
    docked() {
      return this.device_type == 2 ? true : false;
    }
  },
  components: {
    'lys-host': Host
  },
  methods: {
    toggle: function() {
      this.$store.commit(TOGGLE_DRAWER)
    },
    changeTitle(title) {
      this.$store.commit(LIST_TITLE, title);
      if (this.device_type != 2)
        this.toggle();
    },
    ...mapActions({
      getbooks: 'getBooks'
    }),
    goBook(bookname) {
      this.changeTitle(bookname);

      this.$router.push({ path: `/home/${bookname}/all` })
    },
    goAllBook() {
      this.changeTitle("所有文集");

      this.$router.push({ path: `/home/bookslist` })
     
      this.$store.commit(CHANGE_MAIN_TITLE, '')
    }
  },
  async created() {
    await this.getbooks();
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
