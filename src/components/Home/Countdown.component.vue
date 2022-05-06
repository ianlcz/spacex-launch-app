<template>
  <div class="countdown">
    <span>T {{ isNextLaunch ? "-" : "+" }}</span> {{ days }} : {{ hours }} :
    {{ minutes }} : {{ seconds }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CountdownComponent",
  props: {
    launchDate: { type: Date, required: true },
  },
  methods: {
    timer_loop(): void {
      this.now = Math.trunc(new Date().getTime() / 1000);
      setTimeout(this.timer_loop, 1000);
    },
  },
  computed: {
    isNextLaunch(): boolean {
      return new Date() < this.launchDate;
    },
    modifiedDate(): number {
      return Math.trunc(this.launchDate.getTime() / 1000);
    },
    seconds(): string {
      return this.isNextLaunch
        ? ((this.modifiedDate - this.now) % 60).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        : Math.abs((this.modifiedDate - this.now) % 60).toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          );
    },
    minutes(): string {
      return this.isNextLaunch
        ? (Math.trunc((this.modifiedDate - this.now) / 60) % 60).toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          )
        : Math.abs(
            Math.trunc((this.modifiedDate - this.now) / 60) % 60
          ).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
    },
    hours(): string {
      return this.isNextLaunch
        ? (
            Math.trunc((this.modifiedDate - this.now) / 3600) % 24
          ).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
        : Math.abs(
            Math.trunc((this.modifiedDate - this.now) / 3600) % 24
          ).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
    },
    days(): string {
      return this.isNextLaunch
        ? Math.trunc((this.modifiedDate - this.now) / 86400).toLocaleString(
            "en-US",
            {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }
          )
        : Math.abs(
            Math.trunc((this.modifiedDate - this.now) / 86400)
          ).toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
    },
  },
  data: (): { now: number } => ({
    now: 0,
  }),
  created() {
    this.timer_loop();
  },
});
</script>

<style scoped>
div.countdown {
  font-size: 26px;
}

div.countdown > span {
  font-family: D-DIN, Arial, Verdana, sans-serif;
}
</style>
