<template>
  <div class="App">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: D-DIN;
  src: url(fonts/D-DIN.woff2) format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: block;
}

@font-face {
  font-family: D-DIN-Bold;
  src: url(fonts/D-DIN-Bold.woff2) format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: block;
}

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  margin: 0;
  padding: 0 1em;
  background: #000;
  font-family: D-DIN-Bold, Helvetica, Arial, sans-serif;
  font-style: normal;
  color: #fff;
  text-transform: uppercase;
}
</style>
