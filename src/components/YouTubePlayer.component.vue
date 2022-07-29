<template>
  <div class="youtube-player">
    <iframe
      :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1`"
      allowFullScreen
      frameborder="0"
      v-if="youtubeId"
    />
    <p v-else>Awaiting webcast</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YouTubePlayerComponent",
  props: {
    youtubeId: { type: String as () => string | null },
  },
});
</script>

<style scoped>
div.youtube-player > iframe {
  width: 100%;
  margin: 1em auto 0em;
  aspect-ratio: 16/9;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
div.youtube-player > p {
  text-align: center;
}
</style>
