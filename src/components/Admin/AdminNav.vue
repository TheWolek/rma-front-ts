<script setup lang="ts">
import ModuleNavLink from "../Nav/ModuleNavLink.vue";
</script>
<template>
  <div class="moduleNav">
    <ul>
      <ModuleNavLink
        text="użytkownicy"
        v-bind:children="[
          { path: '/admin/users', text: 'wszyscy użytkownicy' },
        ]"
      />
    </ul>
  </div>
</template>
<style lang="scss">
.moduleNav {
  width: 100%;
  padding: 1em 0;
  background: rgb(40, 86, 129);
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
}
</style>
