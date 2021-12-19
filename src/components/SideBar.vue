<template>
  <div
    class="sidebar white--text main-bg"
    :class="!sidebar ? 'closed' : ''"
  >
    <section class="flex-grow-1 pa-4">
      <div class="caption">Current location</div>
      <div class="font-weight-bold py-4">
        <v-icon small class="white--text">mdi-map-marker-outline</v-icon>
        Cileungsi, ID
      </div>
    </section>

    <section class="flex-grow-1">
      <v-list-item to="/search-city">
        <v-list-item-content>
          <v-list-item-title class="yellow--text">
            <v-icon left class="yellow--text">mdi-map-marker-plus</v-icon>
            Add Location
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(location, index) in locationList"
        :key="index"
        :to="`/detail?id=${location.id}`"
      >
        <v-list-item-content>
          <v-list-item-title class="white--text">
            <v-icon left class="white--text">mdi-map-marker</v-icon>
            {{ location.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </section>

    <section class="flex-grow-1">
      <v-list-item
        @click.stop
        v-for="item in bottomItem"
        :key="item"
      >
        <v-list-item-content>
          <v-list-item-title class="white--text fpnt-weight-bold">
            <h4>{{ item }}</h4>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import locationList from '@/helpers/getLocationList'

export default Vue.extend({
  computed: {
    ...mapGetters(['sidebar'])
  },
  data () {
    return {
      locationList,
      bottomItem: ['Settings', 'Share this app', 'Rate this app']
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: white;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  width: 70%;
  z-index: 20;
  overflow: hidden;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
}
.closed {
  transform: translateX(-100%);
}
</style>
