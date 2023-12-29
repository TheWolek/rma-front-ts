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
    <td>{{ item.barcode }}</td>
  </tr>
</template>
