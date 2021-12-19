<template>
  <v-card
    :to="`/detail?id=${location.id}`"
    flat
    class="py-5 px-4 white--text main-bg rounded-xl"
  >
    <div class="d-flex align-center justify-space-between">
      <section>
        <div class="caption">
          Chance of rain 60%
        </div>
        <h3 class="text-shadow text-capitalize">{{ location.weather[0].description }}</h3>
      </section>
      <img
        style="width: 80px;"
        class="image-shadow"
        :src="`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`"
      />
    </div>

    <section class="py-3">
      <div class="caption">
        <v-icon small class="white--text">mdi-map-marker-outline</v-icon>
        {{ location.name }}, {{ location.sys.country }}
      </div>
    </section>

    <section>
      <div class="d-flex justify-space-between align-center">
        <h3 class="text-left">
          {{ calculateTemp(location.main.temp, 'F') }}
          <small class="font-weight-light">
            <sup>°F</sup>
          </small>
        </h3>

        <div class="caption">
          <v-icon small class="white--text">
            mdi-weather-hail
          </v-icon>
          {{ location.main.humidity }}%
        </div>

        <div class="caption">
          <v-icon small class="white--text">
            mdi-weather-sunny
          </v-icon>
          0.5
        </div>

        <div class="caption">
          <v-icon small class="white--text">
            mdi-weather-windy
          </v-icon>
          {{ location.wind.speed }} mp/h
        </div>
      </div>
    </section>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import calculateTemperatureMixin from '@/mixins/calculateTemperature.vue'

export default Vue.extend({
  mixins: [calculateTemperatureMixin],
  props: {
    location: {
      type: Object,
      required: true
    }
  }
})
</script>
