<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";
import MainNav from "./components/Nav/MainNav.vue";

const store = useUserStore();

onMounted(() => {
  store.tryToLogin();
});
</script>
<template>
  <header>
    <MainNav />
  </header>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/styles/base.css";
@import "@/assets/styles/table.css";
@import "@/assets/styles/actions.css";
@import "@/assets/styles/filters.css";
// @import "@/assets/styles/form.css";

#app {
  margin: 0;
  font-weight: normal;
  padding: 0;
}

header {
  line-height: 1.5;
  height: 5vh;
  display: flex;
  place-items: flex-start;
  background: rgb(20, 66, 109);
}

header .wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 5vw;
  width: 100%;
}

nav {
  margin-left: -1rem;
  font-size: 1rem;
  display: flex;
  height: 5vh;
}

nav a.router-link-exact-active {
  color: #fff;
}

nav a:hover {
  background: rgb(23, 76, 126);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  display: flex;
  align-items: center;
}

nav a:first-of-type {
  border: 0;
}

a {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
}
</style>
