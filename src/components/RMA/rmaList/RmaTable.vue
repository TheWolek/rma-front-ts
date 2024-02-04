<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import { storeToRefs } from "pinia";
import TableWithPagination from "@/components/parts/TableWithPagination.vue";
import RmaRow from "./RmaRow.vue";

const store = useRmaStore();

const { rmaList, loadingRmaList, rmaListCurrentPage, rmaListMaxPage } =
  storeToRefs(store);

const changePagePrev = () => {
  rmaListCurrentPage.value = rmaListCurrentPage.value - 1;

  if (rmaListCurrentPage.value <= 0) {
    rmaListCurrentPage.value = 1;
  }

  store.fetchTicketListByFilters();
};

const changePageNext = () => {
  rmaListCurrentPage.value = rmaListCurrentPage.value + 1;

  if (rmaListCurrentPage.value > rmaListMaxPage.value) {
    rmaListCurrentPage.value = rmaListMaxPage.value;
  }

  store.fetchTicketListByFilters();
};
</script>
<template>
  <TableWithPagination
    :pageNumber="rmaListCurrentPage"
    :maxPage="rmaListMaxPage"
    :onPrevPage="changePagePrev"
    :onNextPage="changePageNext"
    :loading="loadingRmaList"
  >
    <template v-slot:theader>
      <tr>
        <th id="checkboxCol"></th>
        <th id="ticketIdCol">Kod kreskowy</th>
        <th id="catCol">kategoria</th>
        <th id="modelCol">model</th>
        <th id="statusCol">status</th>
        <th id="typeCol">typ</th>
        <th id="createdCol">utworzono</th>
        <th id="lastUpdateCol">ostatnia zmiana statusu</th>
      </tr>
    </template>
    <template v-slot:tbody>
      <RmaRow
        v-for="ticket in rmaList"
        :key="ticket.ticket_id.toString()"
        :data="ticket"
      />
    </template>
  </TableWithPagination>
</template>
<style scoped lang="scss">
table,
.loadingWrap {
  width: 70%;
}
#checkboxCol {
  width: 32px;
}
#ticketIdCol {
  width: 190px;
}
#catCol {
  width: 200px;
}
#modelCol {
  width: 200px;
}
#statusCol {
  width: 180px;
}
#typeCol {
  width: 100px;
}
#createdCol,
#lastUpdateCol {
  width: 130px;
}
</style>
