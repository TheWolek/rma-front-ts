<script setup lang="ts">
import ModuleNavLink from "../Nav/ModuleNavLink.vue";
</script>
<template>
  <div class="moduleNav">
    <ul>
      <ModuleNavLink
        text="Produkty"
        :children="[
          { path: '/warehouse/items', text: 'Zarejestrowane produkty' },
          { path: '/warehouse/items/changeshelve', text: 'Zmiana lokalizacji' },
        ]"
      />
      <ModuleNavLink
        text="Części zamienne"
        :children="[
          { path: '/warehouse/spareparts/orders', text: 'Dostawy części' },
          { path: '/warehouse/spareparts', text: 'Zarejestrowane części' },
        ]"
      />
    </ul>
  </div>
</template>
<style>
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
