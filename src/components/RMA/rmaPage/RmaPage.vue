<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import router from "@/router";
import RmaHeader from "./RmaHeader.vue";
import DeviceSection from "./DeviceSection.vue";

const route = useRoute();
const store = useRmaStore();
const storeDict = useDictionaryStore();

const loading = ref(true);
const editMode = ref(store.editMode);

onMounted(async () => {
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
  await storeDict.fetchDictionary(
    storeDict.dictionaries.find((dict) => dict.name === "statusesTypes")
  );
  await store.fetchTicketById(Number(route.params.id));
  await store.fetchTicketAccessories(Number(route.params.id));

  loading.value = false;
});
</script>
<template>
  <div class="rmaPage_wrap">
    <RmaHeader v-if="!loading" />
    <div class="rmaPage_wrap_details">
      <DeviceSection v-if="!loading" />
    </div>
  </div>
</template>
