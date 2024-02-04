<script setup lang="ts">
import { useCollectStore } from "@/stores/collectPackages";
import { storeToRefs } from "pinia";
import TableWithPagination from "@/components/parts/TableWithPagination.vue";
import CollectRow from "./CollectRow.vue";

const store = useCollectStore();
const {
  collectList,
  loadingCollectList,
  collectListCurrentPage,
  collectListMaxPage,
} = storeToRefs(store);

const changePagePrev = () => {
  collectListCurrentPage.value = collectListCurrentPage.value - 1;

  if (collectListCurrentPage.value <= 0) {
    collectListCurrentPage.value = 1;
  }

  store.fetchCollectListByFilters();
};

const changePageNext = () => {
  collectListCurrentPage.value = collectListCurrentPage.value + 1;

  if (collectListCurrentPage.value > collectListMaxPage.value) {
    collectListCurrentPage.value = collectListMaxPage.value;
  }

  store.fetchCollectListByFilters();
};
</script>
<template>
  <TableWithPagination
    :pageNumber="collectListCurrentPage"
    :maxPage="collectListMaxPage"
    :onPrevPage="changePagePrev"
    :onNextPage="changePageNext"
    :loading="loadingCollectList"
  >
    <template v-slot:theader>
      <tr>
        <th id="idCol">ID</th>
        <th id="refNumberCol">Numer zbiorczy</th>
        <th id="createdCol">Data utworzenia</th>
        <th id="statusCol">Status</th>
      </tr>
    </template>
    <template v-slot:tbody>
      <CollectRow
        v-for="item in collectList"
        :key="item.id.toString()"
        :item="item"
      />
    </template>
  </TableWithPagination>
</template>
<style scoped lang="scss">
#idCol {
  width: 40px;
}

#refNumberCol {
  width: 180px;
}

#createdCol,
#statusCol {
  width: 130px;
}
</style>
