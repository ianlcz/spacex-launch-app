<template>
  <div class="launch-information">
    <h1 :class="now >= launchDate ? 'text-center' : 'text-left'">
      {{ now >= launchDate ? "Current launch" : "Next launch" }}
    </h1>

    <h2>{{ launchName }}</h2>

    <p v-if="now < launchDate">
      {{ dateFormat(launchDate) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LaunchInformationComponent",
  computed: {
    isCurrentLaunch(): boolean {
      return this.now >= this.launchDate;
    },
  },
  props: {
    launchName: { type: String, required: true },
    launchDate: { type: Date, required: true },
  },
  methods: {
    dateFormat(date: Date): string {
      return date.toLocaleDateString("en-UK", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
  data: () => ({
    now: new Date(),
  }),
});
</script>

<style scoped>
div.launch-information {
  line-height: 2px;
  text-align: left;
}

div.launch-information > h1.text-center,
div.launch-information > h1.text-left {
  font-family: D-DIN, Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 100;
}
div.launch-information > h1.text-center {
  text-align: center;
}
div.launch-information > h1.text-left {
  text-align: left;
}

div.launch-information > h2 {
  font-family: D-DIN-Bold, Helvetica, Arial, sans-serif;
  font-size: 46px;
  font-weight: 400;
  text-transform: initial;
}
div.launch-information > p {
  font-family: D-DIN, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 100;
}
</style>
