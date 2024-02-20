<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import { storeToRefs } from "pinia";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import RmaActionsSection from "./RmaActionsSection.vue";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const { rmaPage, editMode } = storeToRefs(store);

const getResultTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "resultTypes")
    .items;
});

const copyIssue = () => {
  if (!editMode.value) return;
  rmaPage.value.diagnose = rmaPage.value.issue;
};
</script>
<template>
  <div class="issue">
    <h2>Diagnoza</h2>
    <div class="sectionWrap">
      <div class="issueWrap">
        <h3>Opis zgłoszenia</h3>
        <textarea
          name="issue"
          id="issue"
          v-model="rmaPage.issue"
          cols="70"
          rows="10"
          :disabled="!editMode"
        ></textarea>
        <div v-if="rmaPage.status >= 5">
          <h3>Diagnoza</h3>
          <ActionButton
            display="Kopiuj opis"
            :event="copyIssue"
            :disabled="!editMode"
          />
          <textarea
            name="diagnose"
            id="diagnose"
            v-model="rmaPage.diagnose"
            cols="70"
            rows="10"
            :disabled="!editMode"
          ></textarea>
        </div>
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
        <RmaActionsSection />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.issueWrap {
  .actionBtn {
    margin-bottom: 12px;
  }
}

.resultWrap {
  margin-top: 32px;
  h3 {
    margin-top: 8px;
  }
}
</style>
