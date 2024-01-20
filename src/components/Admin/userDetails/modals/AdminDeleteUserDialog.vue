<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const store = useUserStore();
const { deleteDialogActive } = storeToRefs(store);

const onClose = () => {
  deleteDialogActive.value = !deleteDialogActive.value;
};

const onApprove = () => {
  store.deleteUser();
};
</script>
<template>
  <div class="dialogOverlay" v-if="deleteDialogActive">
    <div class="dialog">
      <h1>Czy na pewno chcesz usunąć użytkownika?</h1>
      <div class="buttons">
        <ActionButton display="Anuluj" :event="onClose" />
        <ActionButton display="Usuń" :event="onApprove" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.dialogOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 5vh);
  background-color: #cacaca67;
  z-index: 10;
  display: grid;
  place-items: center;
}

.dialog {
  width: 380px;
  background-color: #fff;
  padding: 24px;
}

.dialog .buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.dialog .buttons .actionBtn {
  width: 80px;
  justify-content: center;
}
</style>
