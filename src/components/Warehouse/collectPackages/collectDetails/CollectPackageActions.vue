<script setup lang="ts">
import { computed } from "vue";
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import ActionButton from "@/components/parts/buttons/ActionButton.vue";
import ActionButtonRefresh from "@/components/parts/buttons/ActionButtonRefresh.vue";
import router from "@/router";

const store = useCollectStore();
const { collectPage, collectItems } = storeToRefs(store);

const ableToFinish = computed(
  () => collectItems.value.length > 0 && !isClosed.value
);
const isClosed = computed(() => collectPage.value.status === "Odebrany");
const onBack = () => {
  router.go(-1);
};

const onSubmit = () => {
  store.finishCollect();
};

const onRefresh = () => {
  router.go(0);
};
</script>
<template>
  <div class="actions">
    <ActionButton :event="onBack" display="Cofnij" :icon="`back-arrow.png`" />
    <ActionButton
      :event="onSubmit"
      display="Zakończ odbiór"
      :icon="`gear.svg`"
      :disabled="!ableToFinish"
    />
    <ActionButtonRefresh :event="onRefresh" />
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/actions.scss";
</style>
