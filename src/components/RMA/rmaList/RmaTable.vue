<script setup lang="ts">
import { useRmaStore } from "@/stores/RMA";
import LoadingDots from "@/components/parts/LoadingDots.vue";
import RmaRow from "./RmaRow.vue";
import { storeToRefs } from "pinia";

const store = useRmaStore();

const { rmaList, loadingRmaList } = storeToRefs(store);
</script>
<template>
  <div class="ticketsTable">
    <div class="loadingWrap" :class="{ active: loadingRmaList }">
      <LoadingDots :active="loadingRmaList" />
    </div>
    <table>
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
      <RmaRow
        v-for="ticket in rmaList"
        :key="ticket.ticket_id.toString()"
        :data="ticket"
      />
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "@/assets/styles/table.scss";
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
