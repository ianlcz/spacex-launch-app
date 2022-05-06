<template>
  <iframe
    class="launch-video"
    :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`"
    allowFullScreen
    frameborder="0"
    v-if="videoId"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoDisplayerComponent",
  props: {
    videoId: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
iframe.launch-video {
  width: 100%;
  margin-top: 1em;
  aspect-ratio: 16/9;
  border-radius: 12px;
}
</style>
