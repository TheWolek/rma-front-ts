import { useRmaStore } from "@/stores/RMA";
import { useWarehouseStore } from "@/stores/warehouse";

export default (action: string) => {
  const store = useRmaStore();
  const warehouseStore = useWarehouseStore();
  const warehouseModuleActive: boolean =
    JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;

  store.editMode = false;
  switch (action) {
    case "addWaybillIn":
      store.shipmentModalActive = true;
      store.addWaybillModalActive = true;
      break;

    case "toService":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 2,
      });
      break;

    case "collect":
      const waybillIn = store.waybills.find(
        (waybill) => waybill.type === "przychodzący"
      );
      waybillIn.status = "odebrany";

      store.editWaybill(waybillIn);
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 3,
      });
      break;

    case "toDiagnose":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 4,
      });

      if (warehouseModuleActive) {
        warehouseStore.changeItemShevle({
          from: "SH_INWER_1",
          to: "SH_OUTWER_2",
          item: [store.rmaPage.barcode],
        });
      }
      break;

    case "contact":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 7,
      });

      if (warehouseModuleActive) {
        warehouseStore.changeItemShevle({
          from: "SH_INDIN_1",
          to: "SH_OUTDIN_1",
          item: [store.rmaPage.barcode],
        });
      }
      break;

    case "repair":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 5,
      });
      break;

    case "endRepair":
      if (store.rmaPage.result_description !== null) {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 9,
        });
        store.saveTicketData();

        if (warehouseModuleActive) {
          warehouseStore.changeItemShevle({
            from: "SH_INDIN_1",
            to: "SH_OUTDIN_1",
            item: [store.rmaPage.barcode],
          });
        }
      }
      break;

    case "addWaybillOut":
      store.shipmentModalActive = true;
      store.addWaybillModalActive = true;
      break;

    case "send":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 10,
      });

      if (warehouseModuleActive) {
        warehouseStore.removeItem({
          barcode: store.rmaPage.barcode,
          shelve: 9,
          ticket_id: store.rmaPage.ticket_id,
        });
      }
      break;

    case "end":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 10,
      });
      break;

    case "sendCanceled":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 12,
      });

      if (warehouseModuleActive) {
        warehouseStore.removeItem({
          barcode: store.rmaPage.barcode,
          shelve: 9,
          ticket_id: store.rmaPage.ticket_id,
        });
      }
      break;

    case "cancel":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 12,
      });
      break;

    case "toCancel":
      if (store.rmaPage.result_description !== null) {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 11,
        });

        if (warehouseModuleActive) {
          warehouseStore.changeItemShevle({
            from: "SH_INWER_1",
            to: "SH_OUTWER_2",
            item: [store.rmaPage.barcode],
          });
        }
      }
      break;
  }
};
