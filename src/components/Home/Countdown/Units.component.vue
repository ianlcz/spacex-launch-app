<template>
  <div class="units">
    <span class="units-value">{{ value }}</span>
    <span class="units-name">{{ value > 1 ? name + "s" : name }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnitsComponents",
  props: {
    name: { type: String, required: true },
    value: { type: [Number, String], required: true },
  },
});
</script>

<style scoped>
div.units {
  display: flex;
  flex-direction: column;
  margin: 0 0.24em;
  text-align: center;
}
div.units:last-child {
  margin-right: 0;
}

div.units > span.units-value {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
  border-radius: 10px;
  background: #475569;
}

div.units > span.units-name {
  margin-top: 0.8em;
  font-family: D-DIN, Arial, Verdana, sans-serif;
  font-size: small;
  font-weight: 100;
}
</style>
