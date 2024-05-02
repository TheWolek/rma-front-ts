<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import BigModal from "@/components/parts/BigModal.vue";
import TextArea from "@/components/parts/inputs/TextArea.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";

const store = useRmaStore();
const contactReason = ref("");
const contactReasonError = ref("");

const { contactReasonModalActive, rmaPage } = storeToRefs(store);

const toggleModal = () => {
  contactReasonModalActive.value = !contactReasonModalActive.value;
};

const validate = () => {
  if (contactReason.value === "") {
    contactReasonError.value = "Podaj powód kontaktu";
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (validate()) {
    rmaPage.value.contact_reason = contactReason.value;
    rmaPage.value.contact_response = null;

    toggleModal();
    await store.saveTicketData();
    await store.changeTicketStatus({
      ticketId: store.rmaPage.ticket_id,
      status: 10,
    });
  }
};
</script>
<template>
  <BigModal
    :modalActive="contactReasonModalActive"
    :toggleAction="toggleModal"
    modalTitle="Kontakt z klientem"
  >
    <form @submit.prevent="onSubmit">
      <TextArea
        id="contactReason"
        label="Powód kontaktu"
        v-model="contactReason"
        cols="30"
        rows="4"
      />
      <SubmitButton label="Zapisz" />
    </form>
  </BigModal>
</template>
<style scoped lang="scss">
form {
  width: 400px;
}
</style>
