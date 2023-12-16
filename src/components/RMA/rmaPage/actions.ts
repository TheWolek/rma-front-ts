import { useRmaStore } from "@/stores/RMA";
export default (action: string) => {
  const store = useRmaStore();

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
      break;

    case "contact":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 7,
      });
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
          status: 8,
        });
        store.saveTicketData();
      }
      break;

    case "addWaybillOut":
      store.shipmentModalActive = true;
      store.addWaybillModalActive = true;
      break;

    case "send":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 9,
      });
      break;

    case "end":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 10,
      });
      break;

    case "sendCancelled":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 11,
      });
      break;

    case "cancel":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 11,
      });
      break;

    case "toCancel":
      if (store.rmaPage.result_description !== null) {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 10,
        });
      }
      break;
  }
};
