<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { Collect } from "@/stores/collectPackages/constants";
import { formatDateAndHours } from "@/helpers/dateFormatters";

const props = defineProps({
  item: {} as PropType<Collect>,
});

const getDate = computed(() => formatDateAndHours(props.item.created));
</script>
<template>
  <tr>
    <td>
      <RouterLink :to="{ name: 'collectPackage', params: { id: item.id } }">
        {{ item.id }}
      </RouterLink>
    </td>
    <td>{{ item.ref_name }}</td>
    <td>{{ getDate }}</td>
    <td>{{ item.status }}</td>
  </tr>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

table tr td:nth-of-type(1) {
  width: 40px;
}

table tr td:nth-of-type(2) {
  width: 180px;
}

table tr td:nth-of-type(3),
table tr td:nth-of-type(4) {
  width: 130px;
}
</style>
