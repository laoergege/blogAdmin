<template>
  <div>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <lys-host/>

      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="Menu Item 1" />
        <mu-list-item title="Menu Item 2" />
        <mu-list-item title="Menu Item 3" />
        <mu-list-item v-if="docked" @click.native="open = false" title="Close" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import Host from './Host';

export default {
  name: 'AppNavDrawer',
  data() {
    return {
      docked: true
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    toggle(flag) {
      this.open = !this.open
      this.docked = !flag
    }
  },
  components: {
    'lys-host': Host
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
