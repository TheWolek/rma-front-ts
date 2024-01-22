<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDictionaryStore } from "@/stores/dictionary";
import { useRmaStore } from "@/stores/RMA";
import { Filter } from "@/stores/RMA/constants";
import BigModal from "@/components/parts/BigModal.vue";
import TextInput from "@/components/parts/inputs/TextInput.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import SubmitButton from "@/components/parts/buttons/SubmitButton.vue";

const storeDict = useDictionaryStore();
const store = useRmaStore();

const barcode = ref("");
const waybill = ref("");
const status = ref("");
const type = ref("");
const sn = ref("");
const producer = ref("");
const error_form = ref("");
const { filtersModalActive } = storeToRefs(store);

const statuses = computed(
  () =>
    storeDict.dictionaries.find((dict) => dict.name === "statusesTypes").items
);

const activeFilters = computed(() => store.getActiveFilters);

onMounted(() => {
  if (activeFilters.value.length !== 0) {
    activeFilters.value.forEach((filter) => {
      if (filter.name === "zgłoszenie") barcode.value = filter.value;
      if (filter.name === "status") status.value = filter.value;
      if (filter.name === "typ") type.value = filter.value;
      if (filter.name === "sn") sn.value = filter.value;
      if (filter.name === "producent") producer.value = filter.value;
      if (filter.name === "list") waybill.value = filter.value;
    });
  }
});

const toggleModal_filters = () => {
  filtersModalActive.value = !filtersModalActive.value;
  clearData();
};

const clearData = () => {
  barcode.value = "";
  waybill.value = "";
  status.value = "";
  type.value = "";
  sn.value = "";
  producer.value = "";
  error_form.value = "";
};

const onSubmit = () => {
  const filters: Filter[] = [];

  if (barcode.value !== "") {
    filters.push({ name: "zgłoszenie", value: barcode.value });
  }
  if (waybill.value !== "") {
    filters.push({ name: "list", value: waybill.value });
  }
  if (status.value !== "") {
    filters.push({ name: "status", value: status.value });
  }
  if (type.value !== "") {
    filters.push({ name: "typ", value: type.value });
  }
  if (sn.value !== "") {
    filters.push({ name: "sn", value: sn.value });
  }
  if (producer.value !== "") {
    filters.push({ name: "producent", value: producer.value });
  }

  if (filters.length !== 0) {
    store.setFilters(filters);
    toggleModal_filters();
    store.fetchTicketListByFilters();
  }
};
</script>
<template>
  <BigModal
    :modalActive="filtersModalActive"
    :toggleAction="toggleModal_filters"
    modalTitle="Filtry wyszukiwania zgłoszenia serwisowego"
  >
    <form v-on:submit.prevent="onSubmit">
      <TextInput id="barcode" label="Kod kreskowy" v-model="barcode" />
      <TextInput
        id="waybill"
        label="Numer listu przewozowego"
        v-model="waybill"
      />

      <SelectInput id="status" label="Status zgłoszenia" v-model="status">
        <option value="" selected disabled hidden>Wybierz status</option>
        <option
          v-for="status in statuses"
          :key="status.id.toString()"
          :value="status.id"
        >
          {{ status.name }}
        </option>
      </SelectInput>

      <SelectInput class="test" id="type" label="Typ zgłoszenia" v-model="type">
        <option value="" selected disabled hidden>Wybierz typ</option>
        <option value="1">gwarancja</option>
        <option value="2">płatne</option>
      </SelectInput>

      <TextInput id="sn" label="Numer seryjny" v-model="sn" />
      <TextInput id="producer" label="Producent" v-model="producer" />

      <p class="error" :class="{ active: error_form !== '' }">
        {{ error_form }}
      </p>
      <SubmitButton label="Zastosuj" />
    </form>
  </BigModal>
</template>
<style scoped lang="scss">
@import "../../../../assets/styles/form.scss";

form {
  width: 50%;

  .submitButton {
    width: 150px;
  }

  p.error {
    opacity: 0;
    line-height: 20px;
    height: 20px;
    font-size: 13px;
    color: red;
  }

  p.error.active {
    opacity: 1;
  }
}
</style>
