<script setup lang="ts">
import { computed } from "vue";
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import { formatDateAndHours } from "@/helpers/dateFormatters";

const store = useCollectStore();
const { collectPage } = storeToRefs(store);

const getDate = computed(() => formatDateAndHours(collectPage.value.created));
const isClosed = computed(() => collectPage.value.status === "Odebrany");
</script>
<template>
  <div class="details">
    <h1>Odbiór paczek: {{ collectPage.ref_name }} #{{ collectPage.id }}</h1>
    <p>Utworzone: {{ getDate }}</p>
    <h3 v-if="isClosed">
      <b>{{ collectPage.status }}</b>
    </h3>
  </div>
</template>
<style lang="scss" scoped>
.actionBtn {
  width: fit-content;
}
</style>
