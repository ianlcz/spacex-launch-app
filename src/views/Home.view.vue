<template>
  <default-layout>
    <div class="home">
      <h1>This is a Home page</h1>
    </div>
  </default-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "../layouts/Default.layout.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    DefaultLayout,
  },
});
</script>
