<script setup lang="ts">
import { PropType, defineProps, ref } from "vue";
import { DictionaryItem } from "./constants";
import InlineEditInput from "@/components/parts/inputs/InlineEditInput.vue";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

defineProps({
  row: Object as PropType<DictionaryItem>,
  name: String,
});

const name = ref("");
const editMode = ref(false);

function onClick() {
  if (editMode.value) {
    editMode.value = !editMode.value;

    console.log("edit");
  } else {
    editMode.value = !editMode.value;
  }
}
</script>
<template>
  <tr>
    <td class="left">{{ row.id }}</td>
    <td class="right">
      <div class="name">{{ row.name }}</div>
      <InlineEditInput
        :id="row.id.toString()"
        v-model="name"
        v-if="editMode"
        :disabled="false"
      />
      <ActionButton
        :event="onClick"
        :disabled="false"
        :display="editMode ? 'Zapisz' : 'Edytuj'"
      />
    </td>
  </tr>
</template>
<style scoped>
td {
  height: 42px;
  width: 100%;
}
.left {
  text-align: left;
  padding-right: 1em;
  width: 2%;
}
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actionBtn {
  margin-right: 1em;
  margin-left: 2em;
  cursor: pointer;
}
</style>
