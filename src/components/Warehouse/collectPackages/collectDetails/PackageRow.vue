<script setup lang="ts">
import { PropType, defineProps } from "vue";
import { CollectItem } from "@/stores/collectPackages/constants";

defineProps({
  item: {} as PropType<CollectItem>,
});
</script>
<template>
  <tr>
    <td>{{ item.waybill }}</td>
    <td>
      <RouterLink
        :to="{ name: 'rmaPage', params: { id: item.ticket_id } }"
        target="_blank"
        >{{ item.barcode }}</RouterLink
      >
    </td>
  </tr>
</template>
<style scoped>
a,
a:visited {
  color: #000;
  font-weight: bold;
}
</style>
