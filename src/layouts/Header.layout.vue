<template>
  <div class="header-layout">
    <div class="logo">
      <img src="../assets/logo.png" alt="SpaceX Logo" />
      <span>Launch App</span>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/launches">Launches</router-link>
    </nav>
  </div>
</template>

<style scoped>
div.header-layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

div.header-layout > div.logo {
  display: flex;
  flex-direction: column;
  max-width: max-content;
  line-height: 1.6em;
}

div.header-layout > div.logo > img {
  width: 10em;
}

div.header-layout > div.logo > span {
  font-size: 1rem;
  font-family: D-DIN, Arial, Verdana, sans-serif;
}

div.header-layout > nav a {
  position: relative;
  font-family: D-DIN-Bold, Arial, Verdana, sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-decoration: none;
  color: #979797;
}

div.header-layout > nav a.router-link-exact-active {
  color: #fff;
}
</style>
