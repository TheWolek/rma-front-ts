<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import DictionaryTable from "./DictionaryTable.vue";
import { useDictionaryStore } from "../../../stores/dictionary";

const name = ref("");
const displayName = ref("");
const route = useRoute();
const store = useDictionaryStore();

function setType(newName: string) {
  const dictionary = store.findDictionaryByName(newName);

  if (!dictionary) {
    return router.push({
      name: "rma",
    });
  }

  store.fetchDictionary(dictionary);

  name.value = newName;
  displayName.value = dictionary.displayName;
}

onMounted(() => {
  setType(String(route.params.name));
});

watch(route, (to) => {
  if (to.name !== "dictionary") {
    return false;
  }

  setType(String(to.params.name));
});
</script>
<template>
  <div class="tableWrap">
    <h1>{{ displayName }}</h1>
    <DictionaryTable
      :data="store.dictionaries.find((dict) => dict.name === name)?.items"
      :name="name"
    />
  </div>
</template>
<style lang="scss" scoped>
.tableWrap {
  width: 100%;
  padding: 1em;
}
</style>
