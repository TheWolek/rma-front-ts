<script setup lang="ts">
import { computed } from "vue";
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";

const store = useWarehouseStore();
const { changeShelveForm, changeShelveMessage } = storeToRefs(store);

const isSubmitActive = computed(() => changeShelveForm.value.active);
const notificationVisible = computed(() => ({
  active: changeShelveMessage.value.type !== "",
  succ: changeShelveMessage.value.type === "Success",
  fail: changeShelveMessage.value.type === "Fail",
}));

const toggleChangeModal = () => {
  store.changeShelveModalActive = true;
};

const submit = () => {
  if (isSubmitActive.value) {
    store.changeItemShevle();
  }
};

const dismissNotification = () => {
  store.clearNotification();
};

const cancel = () => {
  if (isSubmitActive.value) {
    store.clearChangeShelveData();
  }
};
</script>
<template>
  <div class="actions">
    <ActionButton :event="toggleChangeModal" display="Nowy" :icon="`add.svg`" />
    <ActionButton
      :event="cancel"
      display="Anuluj"
      :icon="`cancel.svg`"
      :disabled="!isSubmitActive"
    />
    <ActionButton
      :event="submit"
      display="Przetwarzaj"
      :icon="`gear.svg`"
      :disabled="!isSubmitActive"
    />
    <div id="changeShelveResponse-msg" :class="notificationVisible">
      {{ changeShelveMessage.message
      }}<span id="close_notifi" @click="dismissNotification"></span>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actions.scss";

#changeShelveResponse-msg {
  font-size: 1em;
  padding: 0 0.5em 0 1em;
  border-radius: 5px;
  opacity: 0;
  transition: 0.2s ease-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

#changeShelveResponse-msg.succ {
  border: 1px solid rgba(36, 241, 6, 0.46);
  background-color: rgba(7, 149, 66, 0.2);
  box-shadow: 0px 0px 2px #259c08;
  color: #0a8108;
}

#changeShelveResponse-msg.succ:hover {
  background: rgba(7, 149, 66, 0.35);
  color: #0b7007;
}

#changeShelveResponse-msg.fail {
  border: 1px solid rgba(241, 6, 6, 0.81);
  background: rgba(220, 17, 1, 0.16);
  box-shadow: 0px 0px 2px #ff0303;
  color: #ff0303;
}

#changeShelveResponse-msg.fail:hover {
  background: rgba(220, 17, 1, 0.33);
  color: #ee0202;
}

#changeShelveResponse-msg.active {
  opacity: 1;
}

#changeShelveResponse-msg.active #close_notifi::after {
  opacity: 1;
}

#changeShelveResponse-msg #close_notifi {
  height: 25px;
}

#changeShelveResponse-msg #close_notifi::after {
  display: inline-block;
  content: "\00d7";
  font-size: 25px;
  transform: translateY(-25%);
  opacity: 0;
}
</style>
