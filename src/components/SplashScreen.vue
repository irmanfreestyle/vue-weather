<template>
  <div class="splash-screen main-bg">
    <v-icon x-large class="white--text weather-icon">wb_sunny</v-icon>
    <div class="white--text text-center">
      <h2 class="my-3">Hello</h2>
      <div class="caption font-weight-light">
        Dont worry about <br> the weather we all here
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.splash-screen {
  z-index: 50;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .weather-icon {
    animation-name: spin;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
