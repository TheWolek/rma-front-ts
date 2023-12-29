<script setup lang="ts">
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import PackageRow from "./PackageRow.vue";

const store = useCollectStore();
const { collectItems } = storeToRefs(store);
</script>
<template>
  <h3>Zeskanowane przesyłki</h3>
  <table>
    <tr>
      <th>Nr listu</th>
      <th>Kod kreskowy</th>
      <th>Numer RMA</th>
    </tr>
    <PackageRow v-for="item in collectItems" :key="item.waybill" :item="item" />
  </table>
</template>
