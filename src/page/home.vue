<template>
  <div class="layout">
    <lys-nav :open="openDrawer" />
    <div :class="{'nav-show': openDrawer}">
      <div class="content">
        <lys-list/>
        <lys-main/>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from '../components/AppNavDrawer';
import List from '../components/List';
import Main from '../components/main';

function isDesktop() {
  return window.innerWidth > 993
}

export default {
  data() {
    const desktop = isDesktop();

    return {
      docked: desktop,
      desktop: desktop,
      openDrawer: desktop
    }
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val
    },
    handleListChange(val) {
      this.activeList = val
    },
    // 侧边导航栏 监听器
    onOpenDrawer() {
      this.openDrawer = this.openDrawer == true ? false : true;
    }
  },
  components: {
    'lys-nav': Nav,
    'lys-list': List,
    'lys-main': Main
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

.tab {
  margin: 0 auto;
  width: 400px;
  background-color: rgba(0, 0, 0, 0);
}

.content {
  overflow: hidden;
  display: flex;
  height: 100vh;
}

.content-left {
  width: 30%;
  /* float: left; */
  background-color: white;
  margin-bottom: -4000px;
  padding-bottom: 4000px;
}

.content-right {
  width: 70%;
  display: inline-block;
  /* float: right; */
  background-color: rgba(0, 0, 0, 0)
}

.breadcrumb {
  margin: 10px 0;
}

.footer {
  padding: 20px 0;
  text-align: center;
}
</style>