<script setup lang="ts">
import { defineProps } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";

const props = defineProps({
  barcode: String,
});

const store = useWarehouseStore();

const removeItem = () => {
  store.deleteItemFromChangeShelve(props.barcode);
};
</script>
<template>
  <tr>
    <td><div class="deleteIcon" @click="removeItem"></div></td>
    <td>{{ barcode }}</td>
    <td>{{ barcode.split("-")[0] }}</td>
    <td>{{ barcode.split("-")[1] }}</td>
    <td>{{ barcode.split("-")[2] }}</td>
  </tr>
</template>
<style scoped>
td .deleteIcon {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

td .deleteIcon:hover {
  cursor: pointer;
}

td .deleteIcon::after {
  position: absolute;
  display: inline;
  content: "\00d7";
  font-size: 25px;
  transform: translateY(-55%) translateX(-30%);
}
</style>
