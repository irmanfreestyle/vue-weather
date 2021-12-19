<template>
  <div>
    <v-card
      flat
      class="rounded-xl mb-3"
      v-for="n in 3"
      :key="n"
    >
      <v-img
        contain
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      />
      <section class="px-5">
        <v-card-text class="black--text">
          <h3>
            Grab Joins Forces with Sejasa.com to Launch ‘Clean & Fix’ Feature
          </h3>
        </v-card-text>
        <v-card-subtitle class="d-flex justify-space-between pt-0">
          <span class="caption grey--text">
            14 minutes ago
          </span>
          <span class="caption black--text">
            Reza Media
          </span>
        </v-card-subtitle>
      </section>
    </v-card>
  </div>
</template>
