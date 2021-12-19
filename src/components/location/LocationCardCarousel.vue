<template>
  <div>
    <section v-if="!loading">
      <Carousel
        :autoplay="false"
        :nav="false"
        :dots="false"
        :items="2"
        :loop="weathers.length > 1 ? true : false"
        :margin="10"
        :responsive="weathers.length <= 1 ? { 0: { items: 1 } } : {
          0: {
            items: 1.07
          },
          768: {
            items: 2.1
          }
        }"
      >
        <LocationCard
          v-for="(weather, index) in weathers"
          :key="index"
          :location="weather"
        />
      </Carousel>
    </section>

    <section v-else>
      <v-card
        flat
        class="rounded-lg pa-5 text-center"
      >
        Loading...
      </v-card>
    </section>
  </div>
</template>

<script lang="ts">
import Carousel from 'vue-owl-carousel'
import Vue from 'vue'
import LocationCard from './LocationCard.vue'
import openWeatherApi from '@/api'
import { mapActions } from 'vuex'
import saveLocation from '@/helpers/saveLocation'
import locationList from '@/helpers/getLocationList'

export default Vue.extend({
  components: { Carousel, LocationCard },
  data () {
    return {
      weathers: new Array<[]>(),
      locationList: '',
      loading: true,
      defaultLatLon: { // Jakarta is default
        lat: -6.200000,
        lon: 106.816666
      }
    }
  },
  created () {
    this.setupLocation()
  },
  methods: {
    ...mapActions(['setSplashScreen']),
    setupLocation () {
      if (!locationList.length) { // If user does not have any location
        this.getUserLocation()
      } else {
        this.getWeathers(locationList)
      }
    },
    geoSuccess (position) {
      this.getWeathers([{
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }])
    },
    geoError () {
      this.getWeathers([this.defaultLatLon])
    },
    getUserLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
      } else {
        this.getWeathers([this.defaultLatLon])
      }
    },
    async getWeathers (locations) {
      this.loading = true
      this.setSplashScreen(true)
      try {
        for (const location of locations) {
          const { id, lat, lon } = location
          let data

          if (id) {
            data = await openWeatherApi.searchById(id)
          } else {
            data = await openWeatherApi.searchByCoord(lat, lon)
          }

          this.weathers.push(data.data)
          saveLocation(data.data, false)
        }
      } catch (error) {
        console.log(error)
      }
      this.loading = false
      setTimeout(() => {
        this.setSplashScreen(false)
      }, 1000)
    }
  }
})
</script>
