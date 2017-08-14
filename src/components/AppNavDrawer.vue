<template>
<div>
    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list @itemClick="docked ? '' : toggle()">
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
        <mu-list-item v-if="docked" @click.native="open = false" title="Close"/>
      </mu-list>
    </mu-drawer>
</div>
</template>

<script>
export default {
  name: 'AppNavDrawer',
  data () {
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
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  },
  updated() {
      console.log(this.open)
  }
}
</script>