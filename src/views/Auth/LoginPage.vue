<script setup lang="ts">
import LoginForm from "../../components/Auth/LoginForm.vue";
</script>
<template>
  <div id="loginPage">
    <LoginForm />
  </div>
</template>
<style lang="scss">
#loginPage {
  width: 100%;
  height: calc(100vh - 10vh);
  display: grid;
  place-items: center;
}
</style>
