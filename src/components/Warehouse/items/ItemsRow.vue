<script setup lang="ts">
import { ItemRow } from "@/stores/warehouse/constants";
import { PropType, defineProps } from "vue";

const props = defineProps({
  data: {} as PropType<ItemRow>,
});
</script>
<template>
  <tr :id="props.data.item_id?.toString()">
    <td><input type="checkbox" :id="props.data.item_id?.toString()" /></td>
    <td>
      <RouterLink
        :to="{ name: 'rmaPage', params: { id: data.ticket_id } }"
        target="_blank"
      >
        {{ data.barcode }}
      </RouterLink>
    </td>
    <td>{{ data.category }}</td>
    <td>{{ data.name }}</td>
    <td :id="data.shelve?.toString()">
      {{ data.shelve_code }}
    </td>
    <td>{{ data.sn }}</td>
    <td class="actionCell">
      <div class="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="menu"></div>
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
