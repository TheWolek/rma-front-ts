<script setup lang="ts">
import { defineProps, PropType, computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import { TicketAction } from "@/stores/RMA/constants";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const props = defineProps({
  data: {} as PropType<TicketAction>,
});

const store = useRmaStore();
const {
  editMode,
  actionFormMode,
  actionEditId,
  newActionName,
  newActionPrice,
} = storeToRefs(store);

const getPrice = computed(() => `${props.data.action_price.toFixed(2)}zł`);

const remove = () => {
  if (!editMode.value) return;

  store.removeAction(props.data.action_id);
};

const edit = () => {
  if (!editMode.value) return;

  actionFormMode.value = 1;
  actionEditId.value = props.data.action_id;
  newActionName.value = props.data.action_name;
  newActionPrice.value = String(props.data.action_price);
};
</script>
<template>
  <tr>
    <td>{{ data.action_name }}</td>
    <td>{{ getPrice }}</td>
    <td>
      <div class="actionCell">
        <ActionButton :icon="`edit.svg`" :event="edit" :disabled="!editMode" />
        <ActionButton
          :icon="`delete.svg`"
          :event="remove"
          :disabled="!editMode"
        />
      </div>
    </td>
  </tr>
</template>
<style scoped lang="scss">
.actionCell {
  display: flex;
  gap: 4px;
}
</style>
