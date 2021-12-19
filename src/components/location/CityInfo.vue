<template>
  <v-card class="rounded-t-xl city-info black--text">
    <v-card-text class="d-flex align-center">
      <div class="pr-3">
        <v-icon color="black">location_on</v-icon>
      </div>
      <div class="flex-grow-1">
        <h3 class="black--text">
          {{ location.name }}
        </h3>
        <span class="caption grey--text">
          {{ location.sys.country }}
        </span>
      </div>
      <div class="d-flex align-center">
        <img
          width="50"
          class="image-shadow"
          :src="`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`"
        />
        <div class="text-h6">
          {{ calculateTemp(location.main.temp, 'F') }}
          <sup>°</sup>
        </div>
      </div>
    </v-card-text>

    <div class="px-4">
      <v-divider class="grey"></v-divider>
    </div>

    <v-card-text class="d-flex justify-space-between">
      <div>
        <div class="caption grey--text">Longitude and latitude</div>
        <div class="caption black--text">
           {{ location.coord.lat }}, {{ location.coord.lon }}
        </div>
      </div>
      <div>
        <div class="caption grey--text">Wind</div>
        <div class="caption black--text">
           {{ location.wind.speed }} mp/h
        </div>
      </div>
    </v-card-text>

    <div class="px-4">
      <v-divider class="grey"></v-divider>
    </div>

    <v-card-text>
      <v-btn
        block
        dark
        rounded
        depressed
        class="main-bg text-none"
        @click="addToLocationList"
      >
        Change Location
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import calculateTemperatureMixin from '@/mixins/calculateTemperature.vue'
import saveLocation from '@/helpers/saveLocation'

export default Vue.extend({
  mixins: [
    calculateTemperatureMixin
  ],
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToLocationList () {
      saveLocation(this.location, true)
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.city-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
