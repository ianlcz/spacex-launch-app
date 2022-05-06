<template>
  <default-layout>
    <p v-if="isLoading">Loading launch data...</p>
    <div class="home" v-else>
      <div class="global-information">
        <div>
          <launch-information-component
            :launchName="nextLaunch.name"
            :launchDate="new Date(nextLaunch.launchDate)"
          />
          <countdown-component :launchDate="new Date(nextLaunch.launchDate)" />
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/Default.layout.vue";
import { ILaunch, Launch } from "@/models/launch.model";
import LaunchInformationComponent from "@/components/Home/LaunchInformation.component.vue";
import CountdownComponent from "@/components/Home/Countdown.component.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DefaultLayout,
    LaunchInformationComponent,
    CountdownComponent,
  },
  data: (): {
    nextLaunch: ILaunch;
    isLoading: boolean;
  } => ({
    nextLaunch: new Launch(),
    isLoading: true,
  }),
  created() {
    this.nextLaunch.getNextLaunch();
    this.isLoading = false;
  },
});
</script>

<style scoped>
div.home {
  display: flex;
  flex-direction: column;
}
div.home > div.global-information {
  width: 60%;
}
div.home > div.global-information > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
