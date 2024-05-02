<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRmaStore } from "@/stores/RMA";
import TextArea from "@/components/parts/inputs/TextArea.vue";

const store = useRmaStore();

const { rmaPage, editMode, rmaPageErrors } = storeToRefs(store);

const ableToEditResponse = computed(
  () => editMode.value && [10].includes(rmaPage.value.status)
);
</script>
<template>
  <div class="contact">
    <h3>Kontakt z klientem</h3>
    <p>
      Powód kontaktu: <b>{{ rmaPage.contact_reason }}</b>
    </p>
    <p>Odpowiedź klienta:</p>
    <TextArea
      id="contactResponse"
      v-model="rmaPage.contact_response"
      cols="30"
      rows="3"
      :disabled="!ableToEditResponse"
      :error="rmaPageErrors.contactResponse"
    />
  </div>
</template>
<style scoped lang="scss">
.contact {
  width: 500px;
  margin-bottom: 24px;

  .form-group {
    margin-left: 6px;
  }

  b {
    margin-left: 6px;
    display: block;
  }
  h3 {
    font-size: 1.1em;
    font-weight: 600;
  }
}
</style>
