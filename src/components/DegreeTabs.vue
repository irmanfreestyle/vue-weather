<template>
  <div class="degree-tabs-wrapper">
    <div
      class="d-flex justify-space-around rounded-pill degree-tabs "
    >
      <div
        @click="switchTab('F')"
        class="py-2 px-5 rounded-pill tab"
        :class="tab === 'F' && 'active-tab'"
      >Fahrenheit</div>
      <div
        @click="switchTab('C')"
        class="py-2 px-5 rounded-pill tab"
        :class="tab === 'C' && 'active-tab'"
      >Celcius</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      tab: 'F'
    }
  },
  methods: {
    switchTab (unit) {
      this.tab = unit
      this.$emit('input', unit)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.degree-tabs-wrapper {
  display: inline-block;

  .tab {
    &:hover {
      cursor: pointer;
    }
  }

  .degree-tabs {
    background-color: #83A5E8;
    margin: auto;

    .active-tab {
      background-color: #C0D2F3;
      color: $main-color;
    }
  }
}
</style>
