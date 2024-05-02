<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const store = useRmaStore();
const {
  editMode,
  actionFormMode,
  rmaPage,
  actionEditId,
  newActionName,
  newActionPrice,
  actionsTotalPrice,
} = storeToRefs(store);

const getPrice = computed(() => `${actionsTotalPrice.value.toFixed(2)} zł`);

const getIcon = computed(() =>
  actionFormMode.value === 0 ? "add.svg" : "save.svg"
);

const ableToAddActions = computed(() => [5, 6].includes(rmaPage.value.status));

const formActionSubmit = () => {
  if (!editMode.value) {
    return;
  }

  if (actionFormMode.value === 0) {
    store.addAction();
  } else {
    store.editAction({
      action_id: actionEditId.value,
      action_name: newActionName.value,
      action_price: parseFloat(newActionPrice.value),
      ticket_id: 0,
    });
  }
};
</script>
<template>
  <div class="actionsAddWrap" v-if="ableToAddActions">
    <TextInput
      id="action_name"
      label="Nazwa"
      v-model="newActionName"
      :disabled="!editMode"
    />
    <TextInput
      id="action_price"
      label="Cena"
      v-model="newActionPrice"
      :disabled="!editMode"
    />
    <ActionButton
      width="35px"
      :icon="getIcon"
      :event="formActionSubmit"
      :disabled="!editMode"
    />
  </div>
  <h3 class="priceHeader">
    Całkowity koszt naprawy: <b>{{ getPrice }}</b>
  </h3>
</template>
<style scoped lang="scss">
.actionsAddWrap {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  .actionBtn {
    align-self: flex-end;
  }
}
</style>
