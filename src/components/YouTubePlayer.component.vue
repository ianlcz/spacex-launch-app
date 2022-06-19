<template>
  <iframe
    class="youtube-player"
    :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1`"
    allowFullScreen
    frameborder="0"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YouTubePlayer",
  props: {
    youtubeId: { type: String as () => string | null },
  },
});
</script>

<style scoped>
iframe.youtube-player {
  width: 100%;
  margin: 1em auto 0em;
  aspect-ratio: 16/9;
  border-radius: 14px;
}
</style>
