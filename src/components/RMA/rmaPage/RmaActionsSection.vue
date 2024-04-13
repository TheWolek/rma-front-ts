<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import ResultsTable from "@/components/parts/ResultsTable.vue";
import RmaActionsRow from "./RmaActionsRow.vue";

const store = useRmaStore();
const {
  editMode,
  actionFormMode,
  actionEditId,
  newActionName,
  newActionPrice,
  actions,
  actionsTotalPrice,
  rmaPage,
  rmaPageErrors,
} = storeToRefs(store);

const getPrice = computed(() => `${actionsTotalPrice.value.toFixed(2)}zł`);

const getIcon = computed(() =>
  actionFormMode.value === 0 ? `add.svg` : `save.svg`
);

const ableToAddActions = computed(() => [5, 6].includes(rmaPage.value.status));

const formActionSubmit = () => {
  if (!editMode.value) return;

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
  <div class="wrap">
    <h3>Wykonane czynności</h3>
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
        inputType="number"
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
    <div>
      <ResultsTable>
        <template v-slot:theader>
          <tr>
            <th id="actionNameCol">Nazwa</th>
            <th id="actionPriceCol">Cena</th>
            <th id="actionsCol">Akcje</th>
          </tr>
        </template>
        <template v-slot:tbody>
          <RmaActionsRow
            v-for="action in actions"
            :key="action.action_id"
            :data="action"
          />
        </template>
      </ResultsTable>
      <p class="error" :class="{ active: rmaPageErrors.actions }">
        {{ rmaPageErrors.actions }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  .actionsAddWrap {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    .actionBtn {
      align-self: flex-end;
    }
  }

  .priceHeader {
    text-transform: none;
  }
}

#actionNameCol {
  width: 170px;
}

#actionPriceCol {
  width: 90px;
}

#actionsCol {
  width: 40px;
}

.error {
  display: block;
}
</style>
