<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import ModuleNavLink from "../Nav/ModuleNavLink.vue";

const store = useUserStore();
const { userRole } = storeToRefs(store);

const dictionariesAvailable = computed(() => "Admin" === userRole.value);
</script>
<template>
  <div class="moduleNav">
    <ul>
      <ModuleNavLink
        text="zgłoszenia serwisowe"
        v-bind:children="[
          { path: '/rma/items', text: 'otwarte zgłoszenia serwisowe' },
          { path: '/rma/add', text: 'dodaj zgłoszenie serwisowe' },
        ]"
      />
      <ModuleNavLink
        v-if="dictionariesAvailable"
        text="słowniki"
        v-bind:children="[
          { path: '/rma/dictionary/accessoriesTypes', text: 'typy akcesoriów' },
          {
            path: '/rma/dictionary/damageTypes',
            text: 'typy stanu urządzenia',
          },
          { path: '/rma/dictionary/statusesTypes', text: 'Statusy zgłoszeń' },
          { path: '/rma/dictionary/resultTypes', text: 'Rezultaty zgłoszeń' },
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
