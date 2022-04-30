<template>
  <default-layout>
    <div class="launches">
      <h1>This is a Launches page</h1>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "../layouts/Default.layout.vue";

export default defineComponent({
  name: "LaunchesView",
  components: {
    DefaultLayout,
  },
});
</script>
