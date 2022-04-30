<template>
  <div class="default-layout">
    <header-layout />
    <main class="default-layout-main">
      <slot />
    </main>
    <footer-layout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLayout from "./Header.layout.vue";
import FooterLayout from "./Footer.layout.vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    HeaderLayout,
    FooterLayout,
  },
});
</script>

<style scoped>
div.default-layout > main.default-layout-main {
  text-align: center;
}
</style>
