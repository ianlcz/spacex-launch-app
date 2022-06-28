<template>
  <div class="units">
    <span class="units-value">{{ value }}</span>
    <span class="units-name">{{ value > 1 ? name + "s" : name }}</span>
  </div>
  {{ name !== "Second" ? ":" : undefined }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnitsComponents",
  props: {
    name: { type: String, required: true },
    value: { type: Number, required: true },
  },
});
</script>

<style scoped>
div.units {
  display: flex;
  flex-direction: column;
  width: 2em;
  margin: 0 0.2em;
  padding: 0.2em;
  text-align: center;
  border-radius: 6px;
  background: #475569;
}
div.units:last-child {
  margin-right: 0;
}

div.units > span.units-name {
  margin-top: 0.5em;
  font-family: D-DIN, Arial, Verdana, sans-serif;
  font-size: small;
  font-weight: 100;
}
</style>
