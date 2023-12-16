<script setup lang="ts">
import { computed } from "vue";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import { storeToRefs } from "pinia";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const { rmaPage, editMode } = storeToRefs(store);

const getResultTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "resultTypes")
    .items;
});
</script>
<template>
  <div class="issue">
    <h2>Diagnoza</h2>
    <div class="sectionWrap">
      <div class="issueWrap">
        <textarea
          name="issue"
          id="issue"
          v-model="rmaPage.issue"
          cols="70"
          rows="10"
          :disabled="!editMode"
        ></textarea>
      </div>
      <div class="resultWrap" v-if="rmaPage.status >= 5">
        <div class="form-group">
          <SelectInput
            id="result_type"
            label="Rezultat zgłoszenia"
            v-model="rmaPage.result_type"
            :disabled="!editMode"
          >
            <option
              v-for="el in getResultTypes"
              :key="el.id.toString()"
              :value="el.id"
            >
              {{ el.name }}
            </option>
          </SelectInput>
        </div>
        <h3>Opis rezultatu zgłoszenia</h3>
        <textarea
          name="resultDescription"
          id="resultDescription"
          v-model="rmaPage.result_description"
          cols="70"
          rows="10"
          :disabled="!editMode"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<style scoped>
.resultWrap {
  padding: 0.5em;
}

.resultWrap h3 {
  margin-top: 8px;
}
</style>
