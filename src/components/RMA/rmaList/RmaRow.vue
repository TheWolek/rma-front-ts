<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { useDictionaryStore } from "@/stores/dictionary";
import { formatDateAndHours } from "@/helpers/dateFormatters";
import { Ticket } from "@/stores/RMA/constants";

const storeDict = useDictionaryStore();

const props = defineProps({
  data: {} as PropType<Ticket>,
});

const getStatusDisplayName = computed(
  () =>
    storeDict
      .getDictionaryByName("statusesTypes")
      .items.find((item) => item.id === props.data.status)?.name
);

const getTypeDisplayName = computed(() =>
  props.data.type === 1 ? "Gwarancja" : "Płatne"
);

const getFormattedCreateDate = computed(() =>
  formatDateAndHours(props.data.created)
);

const getFormattedUpdateDate = computed(() => {
  if (props.data.lastStatusUpdate === null) return "--";
  return formatDateAndHours(props.data.lastStatusUpdate);
});
</script>
<template>
  <tr>
    <td></td>
    <td>
      <router-link :to="{ path: `ticket/${data.ticket_id}` }">{{
        data.barcode
      }}</router-link>
    </td>
    <td>{{ data.device_cat }}</td>
    <td>{{ data.device_producer }} {{ data.device_name }}</td>
    <td>{{ getStatusDisplayName }}</td>
    <td>{{ getTypeDisplayName }}</td>
    <td>{{ getFormattedCreateDate }}</td>
    <td>{{ getFormattedUpdateDate }}</td>
  </tr>
</template>
<style scoped lang="scss">
@import "../../../assets/styles/table.scss";

tr:hover td {
  background-color: rgb(223, 223, 223);
}
</style>
