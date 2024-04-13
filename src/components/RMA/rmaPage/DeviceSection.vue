<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import CheckBoxGroup from "@/components/parts/inputs/CheckBoxGroup.vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const { editMode, rmaPage, deviceAccessories } = storeToRefs(store);

const getAccessoriesTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "accessoriesTypes")
    .items;
});

const getDamageTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "damageTypes")
    .items;
});

const isOnService = computed(
  () =>
    storeDict.processes["InService"].includes(rmaPage.value.status) ||
    storeDict.processes["AfterService"].includes(rmaPage.value.status) ||
    storeDict.processes["Closed"].includes(rmaPage.value.status)
);

function changeShelve() {
  console.log("change shelve");
}
</script>
<template>
  <div class="device">
    <h2>Urządzenie</h2>
    <div class="sectionWrap">
      <h3>
        Kategoria: <b>{{ rmaPage.device_cat }}</b>
      </h3>
      <h3>
        Model: <b>{{ rmaPage.device_producer }} {{ rmaPage.device_name }}</b>
      </h3>
      <InlineEditInput
        id="sn"
        label="SN:"
        v-model="rmaPage.device_sn"
        :disabled="!editMode"
      />
      <CheckBoxGroup
        v-if="isOnService"
        v-model="deviceAccessories"
        name="accessories"
        :options="getAccessoriesTypes"
        :disabledAll="!editMode"
      />
      <div class="form-group damageType" v-if="isOnService">
        <SelectInput
          id="damageType"
          label="Stan urządzenia"
          v-model="rmaPage.damage_type"
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
      <div v-if="isOnService">
        <h3>Opis stanu technicznego</h3>
        <textarea
          name="damageDescription"
          id="damageDescription"
          v-model="rmaPage.damage_description"
          cols="30"
          rows="5"
          :disabled="!editMode"
        ></textarea>
      </div>

      <div class="barcode" v-if="store.rmaPage.inWarehouse">
        <h3>
          <b>{{ rmaPage.barcode }}</b>
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
  </div>
</template>
<style lang="scss" scoped>
.damageType {
  width: 245px;
}
</style>
