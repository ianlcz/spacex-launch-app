<template>
  <default-layout>
    <div class="home">
      <div
        :class="
          now < new Date(nextLaunch.date) ? 'justify-between' : 'justify-center'
        "
      >
        <launch-information-component
          :launchName="nextLaunch.name ? nextLaunch.name : ''"
          :launchDate="new Date(nextLaunch.date)"
        />

        <countdown-component
          :launchDate="new Date(nextLaunch.date)"
          v-if="
            now.getTime() < new Date(nextLaunch.date).getTime() + 30 * 60 * 1000
          "
        />
      </div>

      <youtube-player-component
        :youtubeId="nextLaunch.youtube_id"
        v-if="nextLaunch.youtube_id"
      />
    </div>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/Default.layout.vue";
import { ILaunch, Launch } from "@/models/launch.model";
import LaunchInformationComponent from "@/components/Home/LaunchInformation.component.vue";
import CountdownComponent from "@/components/Home/Countdown.component.vue";
import YoutubePlayerComponent from "@/components/YouTubePlayer.component.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DefaultLayout,
    LaunchInformationComponent,
    CountdownComponent,
    YoutubePlayerComponent,
  },
  data: (): {
    nextLaunch: ILaunch;
    now: Date;
    isLoading: boolean;
  } => ({
    nextLaunch: new Launch(),
    now: new Date(),
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
  width: 70%;
  margin: 0 auto;
}

div.home > div.justify-between,
div.home > div.justify-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}
div.home > div.justify-between {
  justify-content: space-between;
}
div.home > div.justify-center {
  justify-content: center;
}
</style>
