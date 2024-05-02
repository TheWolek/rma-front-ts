<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import BigModal from "@/components/parts/BigModal.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import TextArea from "@/components/parts/inputs/TextArea.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";

const store = useRmaStore();
const cancelReasonType = ref(0);
const cancalResonTypeError = ref("");
const cancelReason = ref("");
const cancelReasonTypes = [
  {
    id: 1,
    name: "Klient rozmyślił się",
  },
  {
    id: 2,
    name: "Rezygnacja z kosztorysu",
  },
  {
    id: 3,
    name: "Inne",
  },
];

const { cancelReasonModalActive, rmaPage } = storeToRefs(store);

const toggleModal = () => {
  cancelReasonModalActive.value = !cancelReasonModalActive.value;
};

const validate = () => {
  if (cancelReasonType.value === 0) {
    cancalResonTypeError.value = "Podaj powód anulowania";
    return false;
  }

  return true;
};

const onSubmit = async () => {
  if (validate()) {
    rmaPage.value.result_type = 6;
    const number = parseInt(cancelReasonType.value.toString());
    const cancelReasonText = cancelReasonTypes.find(
      (o) => o.id === number
    ).name;
    rmaPage.value.result_description = `Anulowano: ${cancelReasonText} ${
      cancelReason.value ? `; ${cancelReason.value}` : ``
    }`;

    toggleModal();

    await store.saveTicketData();
    const nextStatus = rmaPage.value.device_sn === "" ? 9 : 8;
    await store.changeTicketStatus({
      ticketId: store.rmaPage.ticket_id,
      status: nextStatus,
    });
  }
};
</script>
<template>
  <BigModal
    :modalActive="cancelReasonModalActive"
    :toggleAction="toggleModal"
    modalTitle="Anulowanie zlecenia"
  >
    <form @submit.prevent="onSubmit">
      <SelectInput
        id="cancelReasonType"
        label="Powód anulowania"
        v-model="cancelReasonType"
        :error="cancalResonTypeError"
      >
        <option
          v-for="el in cancelReasonTypes"
          :key="el.id.toString()"
          :value="el.id"
        >
          {{ el.name }}
        </option>
      </SelectInput>
      <TextArea
        id="cancelReason"
        label="Komentarz wew."
        v-model="cancelReason"
        cols="20"
        rows="4"
      />
      <SubmitButton label="Anuluj" />
    </form>
  </BigModal>
</template>
<style scoped lang="scss">
form {
  width: 400px;
}
</style>
