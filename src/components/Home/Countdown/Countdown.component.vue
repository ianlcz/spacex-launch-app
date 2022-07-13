<template>
  <div class="countdown">
    <span>T {{ isNextLaunch ? "-" : "+" }}</span>

    <units-component
      :name="unit.name"
      :value="unit.value < 10 ? '0' + unit.value : unit.value"
      :key="index"
      v-for="(unit, index) in definedUnits"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UnitsComponent from "./Units.component.vue";

export default defineComponent({
  name: "CountdownComponent",
  components: { UnitsComponent },
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
    definedUnits(): { name: string; value: number }[] {
      return [
        {
          name: "Day",
          value: this.isNextLaunch
            ? Math.trunc((this.modifiedDate - this.now) / 86400)
            : Math.abs(Math.trunc((this.modifiedDate - this.now) / 86400)),
        },
        {
          name: "Hour",
          value: this.isNextLaunch
            ? Math.trunc((this.modifiedDate - this.now) / 3600) % 24
            : Math.abs(Math.trunc((this.modifiedDate - this.now) / 3600) % 24),
        },
        {
          name: "Minute",
          value: this.isNextLaunch
            ? Math.trunc((this.modifiedDate - this.now) / 60) % 60
            : Math.abs(Math.trunc((this.modifiedDate - this.now) / 60) % 60),
        },
        {
          name: "Second",
          value: this.isNextLaunch
            ? (this.modifiedDate - this.now) % 60
            : Math.abs((this.modifiedDate - this.now) % 60),
        },
      ];
    },
  },
  data: (): {
    now: number;
  } => ({
    now: 0,
  }),
  created() {
    this.timer_loop();
  },
});
</script>

<style scoped>
div.countdown {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 26px;
}

div.countdown > span {
  margin-right: 0.6em;
  font-family: D-DIN, Arial, Verdana, sans-serif;
}
</style>
