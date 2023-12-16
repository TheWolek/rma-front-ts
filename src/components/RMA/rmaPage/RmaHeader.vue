<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import { formatDateAndHours } from "@/helpers/dateFormatters";
import { storeToRefs } from "pinia";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const { rmaPage } = storeToRefs(store);

const getStatusDisplayName = computed(
  () =>
    storeDict.dictionaries
      .find((dict) => dict.name === "statusesTypes")
      .items.find(({ id }) => id === rmaPage.value.status).name
);

const getTypeDisplayName = computed(() =>
  rmaPage.value.type === 1 ? "Naprawa gwarancyjna" : "Naprawa płatna"
);

const getFormattedCreatedDate = computed(() =>
  formatDateAndHours(rmaPage.value.created)
);

const getFormattedStatusDate = computed(() => {
  if (rmaPage.value.lastStatusUpdate === null) return "--";
  return formatDateAndHours(rmaPage.value.lastStatusUpdate);
});
</script>
<template>
  <div class="ticketDetails">
    <h1>Zgłoszenie #{{ rmaPage.ticket_id }}</h1>
    <h3>
      Status: <b>{{ getStatusDisplayName }}</b>
    </h3>
    <h3>
      Typ: <b>{{ getTypeDisplayName }}</b>
    </h3>
    <h3>
      Utworzono: <b>{{ getFormattedCreatedDate }}</b>
    </h3>
    <h3>
      Ostatnia zmiana statusu: <b>{{ getFormattedStatusDate }}</b>
    </h3>
  </div>
</template>
<style scoped>
.ticketDetails {
  margin-bottom: 1em;
  padding: 0 0 8px 8px;
}
</style>
