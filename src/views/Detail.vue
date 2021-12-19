<template>
  <div>
    <div class="main-bg rounded-b-xl" v-if="!loading">
      <HeaderSlot>
        <template v-slot:left>
          <v-btn icon @click="$router.go(-1)">
            <v-icon class="white--text">keyboard_arrow_left</v-icon>
          </v-btn>
        </template>
        <template v-slot:center>
          <h5 class="white--text text-shadow">
            {{ location.name }}, {{ location.sys.country }}
          </h5>
        </template>
        <template v-slot:right>
          <v-btn icon>
            <v-icon class="white--text">more_horiz</v-icon>
          </v-btn>
        </template>
      </HeaderSlot>

      <section class="text-center white--text">
        <DegreeTabs v-model="unit" />

        <div class="d-flex flex-column">
          <img
            style="width: 120px;"
            class="image-shadow mx-auto"
            :src="`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`"
          />
          <div class="text-h4">
            {{ calculateTemp(location.main.temp, this.unit) }}
            <sup>&#176;</sup>
          </div>
        </div>
        <div class="text-subtitle-1 py-3">
          {{ location.coord.lat }}, {{ location.coord.lon }}
        </div>

        <div class="pb-5">
          <h2 class="text-capitalize">{{ location.weather[0].description }}</h2>
          <span class="text-subtitle-1">
            {{ this.today }}
          </span>
        </div>
      </section>
    </div>

    <section class="pa-5">
      <div class="text-subtitle-1">Details</div>
      <v-row dense>
        <v-col
          class="pa-1"
          cols="6"
          sm="6"
          v-for="item in detailItems"
          :key="item.title"
        >
          <v-card
            flat
            class="rounded-xl pa-4"
          >
            <div class="d-flex align-center">
              <img
                width="20px"
                :src="require(`@/assets/images/${item.img}`)"
              />
              <div class="px-3">
                <h5>{{ item.title }}</h5>
                <div class="caption grey--text">
                  {{ item.subtitle }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <section class="px-5 pb-3">
      <div class="text-subtitle-1">Tips</div>
      <v-card
        flat
        class="rounded-xl pa-4 d-flex align-center"
      >
        <img
          :src="require('@/assets/images/star.svg')"
          width="25"
        >
        &emsp;
        <div class="caption">
          Its ok to hangout with your friend!
        </div>
      </v-card>
    </section>
  </div>
</template>

<script lang="ts">

import calculateTemp from '@/helpers/calculateTemp'
import openWeatherApi from '@/api'
import { mapActions } from 'vuex'
import moment from 'moment'
import Vue from 'vue'

export default Vue.extend({
  components: {
    HeaderSlot: () => import('@/components/slots/Header.vue'),
    DegreeTabs: () => import('@/components/DegreeTabs.vue')
  },
  data () {
    return {
      loading: true,
      unit: 'F',
      location: {} as any,
      detailItems: [] as any
    }
  },
  created () {
    this.getLocation()
  },
  methods: {
    ...mapActions(['setSplashScreen']),
    async getLocation () {
      this.loading = true
      this.setSplashScreen(true)
      try {
        const { id } = this.$route.query
        const { data } = await openWeatherApi.searchById(id)
        this.location = data
        this.setDetailItems()
      } catch (error) {
        console.log(error)
      }
      this.loading = false
      setTimeout(() => {
        this.setSplashScreen(false)
      }, 1000)
    },
    calculateTemp (tmp, unit) {
      return calculateTemp(tmp, unit)
    },
    setDetailItems () {
      this.detailItems = [
        {
          img: 'temperature.svg',
          title: calculateTemp(this.location.main.temp, this.unit),
          subtitle: 'Fahrenheit'
        },
        {
          img: 'wind.svg',
          title: `${this.location.wind.speed} mp/h`,
          subtitle: 'Pressure'
        },
        {
          img: 'sun.svg',
          title: '0.2',
          subtitle: 'UV Index'
        },
        {
          img: 'cloud.svg',
          title: `${this.location.main.humidity}%`,
          subtitle: 'Humidity'
        }
      ]
    }
  },
  computed: {
    today () {
      return moment().format('dddd, DD MMMM YYYY')
    }
  }
})
</script>
