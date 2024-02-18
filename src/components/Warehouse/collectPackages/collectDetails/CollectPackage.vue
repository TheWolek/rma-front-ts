<script setup lang="ts">
import router from "@/router";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import CollectPackageActions from "./CollectPackageActions.vue";
import CollectPackageAddForm from "./CollectPackageAddForm.vue";
import CollectPackageDetails from "./CollectPackageDetails.vue";
import CollectPackageAddedTable from "./CollectPackageAddedTable.vue";

const route = useRoute();
const store = useCollectStore();

const { loadingCollectPage } = storeToRefs(store);

onMounted(async () => {
  if (isNaN(parseInt(String(route.params.id)))) {
    router.push({ name: "warehouse" });
    return;
  }
  if (!(await store.fetchCollectById(Number(route.params.id)))) {
    router.push({ name: "warehouse" });
    return;
  }

  loadingCollectPage.value = false;
});
</script>
<template>
  <div id="warehouseCollectPackages">
    <div class="loadingWrap" v-if="loadingCollectPage">
      <LoadingDots :active="loadingCollectPage" />
    </div>
    <div v-if="!loadingCollectPage">
      <CollectPackageActions />
      <div class="warehouseCollectPackages_wrap">
        <CollectPackageDetails />
        <CollectPackageAddForm />
        <CollectPackageAddedTable />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loadingWrap {
  position: relative;
  display: block;
  width: 100%;
  height: calc(100vh - 10vh);
}
.warehouseCollectPackages_wrap {
  padding: 0.5em;
}
</style>
