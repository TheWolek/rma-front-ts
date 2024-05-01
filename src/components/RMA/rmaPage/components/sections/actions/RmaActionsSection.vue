<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import RmaActionsAddForm from "./RmaActionsAddForm.vue";
import ResultsTable from "@/components/parts/ResultsTable.vue";
import RmaActionsRow from "./RmaActionsRow.vue";
import { computed, ref } from "vue";
import axiosInstance from "@/helpers/axiosInstance";
import endpoints from "@/helpers/endpoints";
import { AxiosResponse } from "axios";
import router from "@/router";

const isFetching = ref(false);
const store = useRmaStore();
const {
  actions,
  rmaPage,
  rmaPageErrors,
  actionsTotalPrice,
  fvNumber,
  fvFilePath,
} = storeToRefs(store);

const ableToGenerateFv = computed(
  () => actionsTotalPrice.value > 0 && !isFetching.value
);

const generateFv = async () => {
  if (ableToGenerateFv.value) {
    const response = (await axiosInstance(true).get(
      `${endpoints.rmaGenerateFv}/${rmaPage.value.ticket_id}`
    )) as AxiosResponse<{
      filePath: string;
      fvNumber: string;
    }>;

    if (response.data !== undefined) {
      window.open(
        `${process.env.VUE_APP_API_BASE_URL}${response.data.filePath}`,
        "_blank"
      );
    }

    router.go(0);
  }
};

const openFvFile = async () => {
  if (ableToGenerateFv.value) {
    window.open(
      `${process.env.VUE_APP_API_BASE_URL}${fvFilePath.value}`,
      "_blank"
    );
  }
};
</script>
<template>
  <div class="wrap">
    <h3>Wykonane czynności</h3>
    <RmaActionsAddForm />
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
    <div class="fvWrap">
      <div class="fv" v-if="fvNumber">
        Ostatnia wygenerowana faktura:
        <ActionButton
          width="185px"
          :event="openFvFile"
          :display="`Pobierz: ${fvNumber}`"
        />
      </div>
      <ActionButton
        width="185px"
        display="Generuj nową fakturę"
        :icon="`invoice.svg`"
        :event="generateFv"
        :disabled="!ableToGenerateFv"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .fvWrap {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .fv {
      color: var(--vt-c-black-mute);
    }
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
