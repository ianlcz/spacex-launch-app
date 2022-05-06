<template>
  <div class="next-launch">
    <h1>
      {{ now >= launchDate ? "Current launch" : "Next launch" }}
    </h1>
    <h2>{{ launchName }}</h2>
    <p v-if="now < launchDate">
      {{ dateTime(launchDate) }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import moment from "moment";

export default defineComponent({
  name: "LaunchInformationComponent",
  props: {
    launchName: { type: String, required: true },
    launchDate: { type: Date, required: true },
  },
  methods: {
    dateTime(value: Date): string {
      return moment(value).format("DD/MM/YYYY, HH:mm");
    },
  },
  data: () => ({
    now: new Date(),
  }),
});
</script>

<style scoped>
div.next-launch {
  line-height: 2px;
  text-align: left;
}
div.next-launch > h1 {
  font-family: D-DIN, Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 100;
}
div.next-launch > h2 {
  font-family: D-DIN-Bold, Helvetica, Arial, sans-serif;
  font-size: 46px;
  font-weight: 400;
}
div.next-launch > p {
  font-family: D-DIN, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 100;
}
</style>
