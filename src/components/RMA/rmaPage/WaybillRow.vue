<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { formatDate } from "@/helpers/dateFormatters";
import { Waybill } from "@/stores/RMA/constants";

const props = defineProps({
  data: {
    type: Object as PropType<Waybill>,
    required: true,
  },
  withEdit: {
    type: Boolean,
    default: false,
  },
});

const store = useRmaStore();

const getCreatedDate = computed(() => formatDate(props.data.created));

const getLastUpdateDate = computed(() => {
  if (props.data.lastUpdate === null) {
    return "--";
  }
  return formatDate(props.data.lastUpdate);
});

const openEditModal = (id: number) => {
  console.log(id);
  store.toggleModal_editWaybill(true, props.data);
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
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

img {
  width: 20px;
  cursor: pointer;
}
</style>
