<template>
  <v-app>
    <v-main
      class="app-wrapper grey lighten-3"
      :class="sidebar ? 'hide-scroll' : ''"
    >
        <SplashScreen v-show="showSplashScreen" />
        <SideBar/>
        <div class="content-wrapper" :class="sidebar ? 'sidebarOpen' : ''">
          <router-view/>
        </div>
      </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import SideBar from '@/components/SideBar.vue'
import SplashScreen from '@/components/SplashScreen.vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  components: { SideBar, SplashScreen },
  computed: {
    ...mapGetters(['showSplashScreen', 'sidebar'])
  },
  methods: {
    ...mapActions({
      showSidebar: 'showSidebar'
    })
  },
  watch: {
    $route () {
      this.showSidebar(false)
    },
    sidebar (val) {
      if (val) {
        const wrapper: any = document.querySelector('.app-wrapper')
        wrapper.scrollTop = 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;600&display=swap');

.app-wrapper {
  position: relative;
  font-family: 'Poppins', sans-serif;
  width: 568px;
  max-width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: auto;

  .content-wrapper {
    width: 100%;
    transition: 0.5s;
  }

  .sidebarOpen {
    transform: translateX(70%);
  }
}

.hide-scroll {
  overflow-y: hidden !important;
}
</style>
