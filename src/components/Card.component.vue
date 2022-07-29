<template>
  <div class="card">
    <h2>{{ title }}</h2>

    <div class="card-weather" v-if="weather">
      <div class="card-weather-temperature">
        <p>Temperature</p>
        <p>{{ weather?.temperature }}°C</p>
      </div>
      <div class="card-weather-weather">
        <p>Weather</p>
        <p>{{ weather?.name }}</p>
      </div>
      <div class="card-weather-wind_speed">
        <p>Wind</p>
        <p>{{ weather?.wind_speed }} km/h</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardComponent",
  props: {
    title: { type: String, required: true },
    name: { type: String, required: false },
    weather: { type: Object, required: false },
  },
});
</script>

<style scoped>
div.card {
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  background: #475569;
}
div.card > h2 {
  margin: 0;
  margin-bottom: 0.5em;
  font-family: D-DIN-Bold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}
div.card > h3 {
  margin: 0;
}

div.card > div.card-weather {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
div.card > div.card-weather > div {
  display: flex;
  flex-direction: column;
  text-align: center;
}
div.card > div.card-weather > div > p {
  margin: 0;
  padding: 0;
}
div.card > div.card-weather > div > p:first-child {
  margin-bottom: 0.2em;
  font-family: D-DIN, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 100;
}
div.card > div.card-weather > div > p:last-child {
  font-size: 18px;
}

div.card > div.card-weather > div.card-weather-wind_speed > p:last-child {
  text-transform: lowercase;
}
</style>
