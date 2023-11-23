<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import router from "@/router";
import DeviceSection from "./DeviceSection.vue";

const route = useRoute();
const store = useRmaStore();
const storeDict = useDictionaryStore();

const loading = ref(true);

onMounted(async () => {
  console.log(route.params.id);
  if (isNaN(parseInt(String(route.params.id)))) {
    router.push({ name: "rma" });
    return;
  }

  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "accessoriesTypes")
  );
  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "damageTypes")
  );
  await store.fetchTicketById(Number(route.params.id));
  await store.fetchTicketAccessories(Number(route.params.id));

  loading.value = false;
});
</script>
<template>
  <div>{{ route.params.id }}</div>
  <DeviceSection v-if="!loading" />
</template>
