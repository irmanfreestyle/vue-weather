export default function calculateTemp (kelvin: number, unit: string): number {
  const celcius = kelvin - 273.15
  const fahrenheit = Math.floor(((celcius * 1.8) + 32))
  return unit === 'C' ? Math.floor(celcius) : fahrenheit
}
