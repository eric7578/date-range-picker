<template>
  <div id="app">
    <date-range-picker :date.sync="date[0]" :date-end.sync="date[1]" :single-date-picker="false" :time-picker="true"></date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from './components/DateRangePicker.vue'

export default {
  components: {
    DateRangePicker
  },
  data() {
    return {
      date: [
        new Date(),
        new Date()
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
