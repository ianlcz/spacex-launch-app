<template>
  <div class="default-layout">
    <header-layout />
    <main class="default-layout-main">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLayout from "./Header.layout.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    HeaderLayout,
  },
});
</script>

<style scoped>
div.default-layout > main.default-layout-main {
  margin-top: 1em;
  text-align: center;
}
</style>
