<script setup lang="ts">
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import CollectRow from "./CollectRow.vue";

const store = useCollectStore();
const { collectList, loadingCollectList } = storeToRefs(store);
</script>
<template>
  <div>
    <table>
      <div class="loadingWrap" :class="{ active: loadingCollectList }">
        <LoadingDots :active="loadingCollectList" />
      </div>
      <tr>
        <th>ID</th>
        <th>Numer zbiorczy</th>
        <th>Data utworzenia</th>
        <th>Status</th>
      </tr>
      <CollectRow
        v-for="item in collectList"
        :key="item.id.toString()"
        :item="item"
      />
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";

table tr th:nth-of-type(1) {
  width: 40px;
}

table tr th:nth-of-type(2) {
  width: 180px;
}

table tr th:nth-of-type(3),
table tr th:nth-of-type(4) {
  width: 130px;
}
</style>
