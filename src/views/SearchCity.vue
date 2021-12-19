<template>
  <div>
    <section class="header-wrapper grey lighten-3">
      <HeaderSlot>
        <template v-slot:left>
          <v-btn icon @click="$router.go(-1)">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
        </template>
        <template v-slot:center>
          <h5>Change Location</h5>
        </template>
      </HeaderSlot>

      <v-text-field
        v-model="cityName"
        @keyup="searchByCity"
        placeholder="Enter cities"
        prepend-inner-icon="search"
        class="white mx-4 mb-3"
        outlined
        rounded
        dense
        hide-details
      />
    </section>

    <div class="map-wrapper">
      <l-map
        :zoom="13"
        :center="center"
        @click="moveMarker"
        v-if="!loading"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          :lat-lng="markerLatLng"
          :icon="markerIcon"
        />
      </l-map>
    </div>

    <CityInfo
      v-if="showInfo"
      :location="location"
    />
  </div>
</template>

<script lang="ts">
import { icon } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import Vue from 'vue'
import openWeatherApi from '@/api'
import locationList from '@/helpers/getLocationList'

export default Vue.extend({
  components: {
    HeaderSlot: () => import('@/components/slots/Header.vue'),
    CityInfo: () => import('@/components/location/CityInfo.vue'),
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      showInfo: false,
      loading: true,
      cityName: '',
      location: {},
      timeout: setTimeout(() => { return '' }),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [-6.200000, 106.816666],
      markerLatLng: [-6.200000, 106.816666],
      markerIcon: icon({
        iconUrl: require('@/assets/images/marker.svg'),
        iconSize: [80, 80]
      })
    }
  },
  created () {
    this.setupLocation()
  },
  methods: {
    async setupLocation () {
      try {
        if (locationList.length) {
          let { lat, lon, id } = locationList[0]

          if (id) {
            const { data } = await openWeatherApi.searchById(id)
            lat = data.coord.lat
            lon = data.coord.lon
          }

          this.center = [lat, lon]
          this.markerLatLng = [lat, lon]
        }
      } catch (error) {
        console.log(error)
      }

      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    async searchByCity () {
      clearTimeout(this.timeout)

      if (!this.cityName.trim()) return false

      this.timeout = setTimeout(async () => {
        try {
          const { data } = await openWeatherApi.searchByCity(this.cityName)
          const { lat, lon } = data.coord

          this.location = data
          this.showInfo = true
          this.markerLatLng = [lat, lon]
          this.center = [lat, lon]
        } catch (error: any) {
          this.showInfo = false
        }
      }, 1000)
    },
    async moveMarker ({ latlng: { lat, lng } }) {
      this.markerLatLng = [lat, lng]
      this.center = [lat, lng]
      const byCoord = await openWeatherApi.searchByCoord(lat, lng)
      const { data } = await openWeatherApi.searchByCity(byCoord.data.name)

      this.location = data
      this.showInfo = true
    }
  }
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;
}
.map-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
