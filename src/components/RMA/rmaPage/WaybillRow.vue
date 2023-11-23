<script setup lang="ts">
import { formatDate } from "@/helpers/dateFormatters";
import { defineProps, computed, PropType } from "vue";
import { WaybillRow } from "./constants";

const props = defineProps({
  data: {
    type: Object as PropType<WaybillRow>,
    required: true,
  },
  withEdit: {
    type: Boolean,
    default: false,
  },
});

const getCreatedDate = computed(() => formatDate(props.data.created));

const getLastUpdateDate = computed(() => {
  if (props.data.lastUpdate === null) {
    return "--";
  }
  return formatDate(props.data.lastUpdate);
});

const openEditModal = (id: number) => {
  console.log(id);
};
</script>
<template>
  <tr>
    <td>{{ data.waybill_number }}</td>
    <td>{{ data.status }}</td>
    <td>{{ data.type }}</td>
    <td>{{ getCreatedDate }}</td>
    <td>{{ getLastUpdateDate }}</td>
    <td v-if="withEdit">
      <img src="@/assets/edit.svg" @click="() => openEditModal(data.id)" />
    </td>
  </tr>
</template>
<style scoped>
img {
  width: 20px;
  cursor: pointer;
}
</style>
