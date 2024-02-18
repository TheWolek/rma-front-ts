<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import ActionButton from "../parts/buttons/ActionButton.vue";
import router from "@/router";
import AccountBadge from "./AccountBadge.vue";

const store = useUserStore();
const { isLoggedIn, userRole } = storeToRefs(store);

const rmaAvailable = computed(
  () =>
    "Admin" === userRole.value ||
    "CC" === userRole.value ||
    "TECH" === userRole.value ||
    "LS" === userRole.value
);

const warehouseModuleActive =
  JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;
const warehouseAvailable = computed(
  () =>
    warehouseModuleActive &&
    ("Admin" === userRole.value || "LS" === userRole.value)
);

const adminPanelModuleActive =
  JSON.parse(process.env.VUE_APP_MODULE_ADMIN) || false;
const adminPanelAvailable = computed(
  () => adminPanelModuleActive && "Admin" === userRole.value
);

const logoutAction = () => {
  store.logout();
  router.push("/logowanie");
};
</script>
<template>
  <div class="wrapper">
    <nav v-if="!isLoggedIn"></nav>
    <nav v-if="isLoggedIn">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="rmaAvailable" to="/rma">RMA</RouterLink>
      <RouterLink v-if="warehouseAvailable" to="/warehouse">Magazyn</RouterLink>
    </nav>
    <div class="account" v-if="isLoggedIn">
      <AccountBadge />
      <ActionButton display="Wyloguj" :event="logoutAction" />
      <RouterLink to="/admin" v-if="adminPanelAvailable">
        <ActionButton display="Admin Panel" />
      </RouterLink>
    </div>
  </div>
</template>
<style lang="scss">
.account {
  display: flex;
  align-items: center;
  gap: 25px;
}
</style>
