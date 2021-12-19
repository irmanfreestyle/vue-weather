<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    calculateTemp (kelvin: number, unit: string): number {
      const celcius = kelvin - 273.15
      const fahrenheit = Math.floor(((celcius * 1.8) + 32))
      return unit === 'C' ? Math.floor(celcius) : fahrenheit
    }
  }
})
</script>
