<script setup lang="ts">
import { ref, computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import CheckBoxGroup from "@/components/parts/inputs/CheckBoxGroup.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const editMode = ref(store.editMode);
const rmaPage = store.rmaPage;
const sn = ref(store.rmaPage.device_sn);
const accessories = ref(store.rmaPage.device_accessories);
const damageType = ref(store.rmaPage.damage_type);
const damageDescription = ref(store.rmaPage.damage_description);

const getBarcode = computed(() => {
  return "barcode";
});

const getAccessoriesTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "accessoriesTypes")
    .items;
});

const getDamageTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "damageTypes")
    .items;
});

function changeShelve() {
  console.log("change shelve");
}
</script>
<template>
  <div class="device">
    <h2>Urządzenie</h2>
    <h3>{{ rmaPage.device_cat }}</h3>
    <h3>{{ rmaPage.device_producer }} {{ rmaPage.device_name }}</h3>
    <InlineEditInput id="sn" label="SN:" v-model="sn" :disabled="!editMode" />
    <CheckBoxGroup
      v-model="accessories"
      name="accessories"
      :options="getAccessoriesTypes"
      :disabledAll="!editMode"
    />
    <div class="form-group">
      <SelectInput
        id="damageType"
        label="Stan urządzenia"
        v-model="damageType"
        :disabled="!editMode"
      >
        <option
          v-for="el in getDamageTypes"
          :key="el.id.toString()"
          :value="el.id"
        >
          {{ el.name }}
        </option>
      </SelectInput>
    </div>
    <h3>Opis stanu technicznego</h3>
    <textarea
      name="damageDescription"
      id="damageDescription"
      v-model="damageDescription"
      cols="30"
      rows="5"
      :disabled="!editMode"
    ></textarea>

    <div class="barcode" v-if="store.rmaPage.inWarehouse">
      <h3>
        Barcode: <b>{{ getBarcode }}</b>
      </h3>
    </div>
    <div class="register" v-if="store.rmaPage.inWarehouse">
      <h3>
        Warehouse ID: <b>#{{ rmaPage.item_id }}</b>
      </h3>
    </div>
    <div class="shelve" v-if="store.rmaPage.inWarehouse">
      <ActionButton :event="changeShelve" display="Zmień lokalizacje" />
      <h3>
        Lokalizacja: <b>{{ rmaPage.code }}</b>
      </h3>
    </div>
  </div>
</template>
