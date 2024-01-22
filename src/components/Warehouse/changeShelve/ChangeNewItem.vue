<script setup lang="ts">
import { ref } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import { barcodeReg } from "@/components/Warehouse/items/modals/validators";

const store = useWarehouseStore();
const { changeShelveForm, changeShelveItems, changeShelveAllowedItems } =
  storeToRefs(store);

const codeToAdd = ref("");

const onAdd = () => {
  clearFail();
  if (codeToAdd.value !== "") {
    if (!barcodeReg.test(codeToAdd.value)) {
      return onFail("Niepoprawny format");
    }

    if (!changeShelveAllowedItems.value.includes(codeToAdd.value)) {
      return onFail("Brak produktu");
    }

    if (changeShelveItems.value.includes(codeToAdd.value)) {
      return onFail("Kod już wprowadzony");
    }

    changeShelveItems.value.push(codeToAdd.value);
    codeToAdd.value = "";
    document.getElementById("addInput").focus();
  }
};

const onFail = (error: string) => {
  document.getElementById("addInput").classList.add("fail");
  document.querySelector(".addInput").setAttribute("data-after", error);
  document.documentElement.style.setProperty(
    "--changeShelve-input-error-opacity",
    "1"
  );
};

const clearFail = () => {
  document.getElementById("addInput").classList.remove("fail");
  document.querySelector(".addInput").setAttribute("data-after", "");
  document.documentElement.style.setProperty(
    "--changeShelve-input-error-opacity",
    "0"
  );
};
</script>
<template>
  <tr>
    <td></td>
    <td class="addInput" data-after="">
      <input
        type="text"
        id="addInput"
        v-model="codeToAdd"
        @keyup.enter="onAdd"
        :disabled="!changeShelveForm.active"
      />
    </td>
  </tr>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";
td.addInput {
  padding: 0.2em 0;
  position: relative;

  &::after {
    content: attr(data-after);
    display: block;
    height: 25px;
    background: rgb(235, 97, 88);
    position: absolute;
    top: 2.5em;
    left: 0.3em;
    border-radius: 5px;
    border: 1px solid red;
    padding: 0 0.4em;
    opacity: var(--changeShelve-input-error-opacity);
  }
}

input#addInput {
  width: 100%;

  &.fail,
  &.fail:focus {
    color: red;
    outline: none !important;
    border: 2px solid red;
    box-shadow: 0 0 10px #719ece;
  }
}
</style>
