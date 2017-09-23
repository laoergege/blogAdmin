<template>
  <div id="app">
    <router-view></router-view>
    <transition name="fade">
      <div class="progress" v-if="show">
        <mu-circular-progress mode="determinate" :size="60" :strokeWidth="5" :value="value" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      value: 10,
      show: true
    }
  },
  created() {
  },
  mounted() {
    this.timer = setInterval(() => {
      this.value += 30
    }, 800)
    setTimeout(() => {
      this.show = false;
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>
.progress {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  z-index: 1000;
  background: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
