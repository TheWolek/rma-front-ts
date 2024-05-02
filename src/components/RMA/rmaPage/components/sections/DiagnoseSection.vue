<script setup lang="ts">
import { computed } from "vue";
import { useRmaStore } from "@/stores/RMA";
import { useDictionaryStore } from "@/stores/dictionary";
import { storeToRefs } from "pinia";
import SelectInput from "@/components/parts/inputs/SelectInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import TextArea from "@/components/parts/inputs/TextArea.vue";
import RmaActionsSection from "./actions/RmaActionsSection.vue";

const store = useRmaStore();
const storeDict = useDictionaryStore();

const { rmaPage, editMode, rmaPageErrors } = storeToRefs(store);

const getResultTypes = computed(() => {
  return storeDict.dictionaries.find((dict) => dict.name === "resultTypes")
    .items;
});

const isDiagnoseVisible = computed(
  () => !storeDict.processes["New"].includes(rmaPage.value.status)
);

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
        <TextArea
          id="issue"
          label="Opis zgłoszenia"
          v-model="rmaPage.issue"
          cols="80"
          rows="8"
          :disabled="!editMode"
        />
        <div v-if="isDiagnoseVisible">
          <ActionButton
            display="Kopiuj opis"
            width="90px"
            :event="copyIssue"
            :disabled="!editMode"
          />
          <TextArea
            id="diagnose"
            label="Diagnoza"
            v-model="rmaPage.diagnose"
            cols="80"
            rows="8"
            :disabled="!editMode"
            :error="rmaPageErrors.diagnose"
          />
        </div>
      </div>
      <div class="resultWrap" v-if="isDiagnoseVisible">
        <SelectInput
          id="resultType"
          label="Rezultat zgłoszenia"
          v-model="rmaPage.result_type"
          :disabled="!editMode"
          :error="rmaPageErrors.resultType"
        >
          <option
            v-for="el in getResultTypes"
            :key="el.id.toString()"
            :value="el.id"
          >
            {{ el.name }}
          </option>
        </SelectInput>
        <div class="resultDescription">
          <TextArea
            id="resultDescription"
            label="Opis rezultatu zgłoszenia"
            v-model="rmaPage.result_description"
            cols="80"
            rows="8"
            :disabled="!editMode"
            :error="rmaPageErrors.resultDescription"
          />
        </div>
        <RmaActionsSection />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.issueWrap {
  width: 540px;
  .actionBtn {
    margin-bottom: 12px;
  }
}

.resultWrap {
  width: 540px;
  margin-top: 32px;
  h3 {
    margin-top: 8px;
  }
}

.resultDescription {
  margin: 24px 0;
}
</style>
