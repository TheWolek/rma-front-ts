<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import ModuleNavLink from "../Nav/ModuleNavLink.vue";

const store = useUserStore();
const { userRole } = storeToRefs(store);

const coreWarehouseAvailable = computed(
  () => "Admin" === userRole.value || "LS" === userRole.value
);
</script>
<template>
  <div class="moduleNav">
    <ul>
      <ModuleNavLink
        v-if="coreWarehouseAvailable"
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
