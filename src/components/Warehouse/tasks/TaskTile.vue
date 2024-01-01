<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import { Task } from "@/stores/tasks/constants";
import router from "@/router";

const props = defineProps({
  item: {} as PropType<Task>,
});

const warehouseStore = useWarehouseStore();
const { shelves } = storeToRefs(warehouseStore);

const shelveOut = computed(
  () => shelves.value.find((o) => o.shelve_id === props.item.shelve_out)?.code
);

const shelveIn = computed(
  () => shelves.value.find((o) => o.shelve_id === props.item.shelve_in)?.code
);

const onClick = async () => {
  await warehouseStore.setDataFromMoveTask({
    taskName: props.item.name,
    from: shelveOut.value,
    to: shelveIn.value,
  });

  router.push({
    name: "itemsChangeShelve",
  });
};
</script>
<template>
  <div class="taskTile" @click="onClick">
    <h3>{{ item.displayName }}</h3>
    <div class="activeWrap">
      <div class="shelveCodes">
        <h4 class="shelveCode">
          Z:
          {{ shelveOut }}
        </h4>
        <h4 class="shelveCode">
          Do:
          {{ shelveIn }}
        </h4>
      </div>
      <div class="active">
        <div class="bar"></div>
        <h4>Aktywne zadania</h4>
        <h4 :class="{ bold: item.active > 0 }">{{ item.active }}</h4>
      </div>
    </div>
  </div>
</template>
<style scoped>
.taskTile {
  padding: 0.5em 1em 1em 0.5em;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color ease-out 0.3s;
}

.taskTile:hover {
  background-color: #f5f5f5;
}

.activeWrap {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.shelveCodes {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 8px;
}

.shelveCode {
  font-weight: 600;
}

.active {
  background: #cecece;
  padding: 6px 16px 2px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin-top: 8px;
}

.bar {
  width: 90%;
  border: 2px solid rgb(18, 125, 197);
  border-radius: 16px;
}

h3 {
  text-transform: none;
}

h4 {
  color: var(--vt-c-black-mute);
  font-size: 13px;
}

h4.bold {
  font-weight: bold;
}
</style>
