<template>
  <default-layout>
    <div v-if="!launch?.date">Loading launch data...</div>

    <div class="home" v-else>
      <div
        :class="
          launch.date && now < launch.date
            ? 'justify-between'
            : 'justify-center'
        "
      >
        <launch-information-component
          :launchName="launch.name ? launch.name : ''"
          :launchDate="launch.date || new Date()"
        />

        <countdown-component
          :launchDate="launch.date"
          v-if="launch.date && now.getTime() < launch.date.getTime()"
        />
      </div>

      <youtube-player-component :youtubeId="launch.youtube_id" />

      <card-component title="Launch" :weather="launch.launch_site.weather" />
    </div>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/Default.layout.vue";
import { Launch } from "@/models/launch.model";
import LaunchInformationComponent from "@/components/Home/LaunchInformation.component.vue";
import CountdownComponent from "@/components/Home/Countdown/Countdown.component.vue";
import YoutubePlayerComponent from "@/components/YouTubePlayer.component.vue";
import CardComponent from "@/components/Card.component.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DefaultLayout,
    LaunchInformationComponent,
    CountdownComponent,
    YoutubePlayerComponent,
    CardComponent,
  },
  data: (): {
    launch?: Launch;
    now: Date;
  } => ({
    launch: new Launch(),
    now: new Date(),
  }),
  created() {
    this.launch?.getNextLaunch();
  },
});
</script>

<style scoped>
div.home {
  display: flex;
  flex-direction: column;
  width: 80%;
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
