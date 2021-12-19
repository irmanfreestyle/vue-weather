<template>
  <div class="home-wrapper">
    <HeaderSlot class="white">
      <template v-slot:left>
        <v-btn icon @click="toggleSidebar">
          <v-icon>menu</v-icon>
        </v-btn>
      </template>
      <template v-slot:center>
        <h5>{{ currentLocation }}</h5>
      </template>
      <template v-slot:right>
        <v-btn icon>
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
    </HeaderSlot>

    <section class="px-3">
      <LocationCardList/>
    </section>

    <section class="px-3">
      <div class="text-subtitle-1 py-2">News</div>
      <NewsList/>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderSlot from '@/components/slots/Header.vue'
import LocationCardList from '@/components/location/LocationCardCarousel.vue'
import NewsList from '@/components/NewsList.vue'
import locationList from '@/helpers/getLocationList'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'Home',
  components: {
    LocationCardList,
    HeaderSlot,
    NewsList
  },
  data () {
    return {
      currentLocation: 'Jakarta, ID'
    }
  },
  watch: {
    showSplashScreen () {
      this.setLocation()
    }
  },
  created () {
    this.setLocation()
  },
  methods: {
    ...mapActions({
      showSidebar: 'showSidebar'
    }),
    toggleSidebar () {
      this.showSidebar(!this.sidebar)
    },
    setLocation () {
      if (locationList.length) {
        this.currentLocation = locationList[0].name
      }
    }
  },
  computed: {
    ...mapGetters(['showSplashScreen', 'sidebar'])
  }
})
</script>

<style lang="scss" scoped>
.home-wrapper {
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(125,213,129,1) 0%, rgba(235,244,236,1) 0%, rgba(226,223,223,1) 60%, rgba(251,251,251,1) 76%);
}
</style>
