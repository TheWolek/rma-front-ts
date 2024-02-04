<script setup lang="ts">
import { useWarehouseStore } from "@/stores/warehouse";
import { storeToRefs } from "pinia";
import TableWithPagination from "@/components/parts/TableWithPagination.vue";
import ItemsRow from "./ItemsRow.vue";

const store = useWarehouseStore();
const { loadingItemsList, itemsList, itemsListCurrentPage, itemsListMaxPage } =
  storeToRefs(store);

const changePagePrev = () => {
  itemsListCurrentPage.value = itemsListCurrentPage.value - 1;

  if (itemsListCurrentPage.value <= 0) {
    itemsListCurrentPage.value = 1;
  }

  store.fetchByFilters();
};

const changePageNext = () => {
  itemsListCurrentPage.value = itemsListCurrentPage.value + 1;

  if (itemsListCurrentPage.value > itemsListMaxPage.value) {
    itemsListCurrentPage.value = itemsListMaxPage.value;
  }

  store.fetchByFilters();
};
</script>
<template>
  <TableWithPagination
    :pageNumber="itemsListCurrentPage"
    :maxPage="itemsListMaxPage"
    :onPrevPage="changePagePrev"
    :onNextPage="changePageNext"
    :loading="loadingItemsList"
  >
    <template v-slot:theader>
      <tr>
        <th id="checkBoxCol"></th>
        <th id="barcodeCol">Kod kreskowy</th>
        <th id="categoryCol">Kategoria</th>
        <th id="modelCol">Model</th>
        <th id="shelveCol">Lokalizacja</th>
        <th id="snCol">SN</th>
        <th id="actionCol">Akcje</th>
      </tr>
    </template>
    <template v-slot:tbody>
      <ItemsRow
        v-for="item in itemsList"
        :key="item.item_id.toString()"
        :data="item"
    /></template>
  </TableWithPagination>
</template>
<style scoped lang="scss">
#checkBoxCol {
  width: 32px;
}

#barcodeCol {
  width: 160px;
}

#categoryCol {
  width: 185px;
}

#modelCol {
  width: 210px;
}
#shelveCol {
  width: 180px;
}

#shelveCol {
  width: 180px;
}

#snCol {
  width: 200px;
}

#actionCol {
  width: 52px;
}
</style>
