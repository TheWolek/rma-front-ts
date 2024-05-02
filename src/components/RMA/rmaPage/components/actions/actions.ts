import { useRmaStore } from "@/stores/RMA";
// import { useWarehouseStore } from "@/stores/warehouse";

export default (action: string) => {
  const store = useRmaStore();
  // const warehouseStore = useWarehouseStore();
  // const warehouseModuleActive: boolean =
  //   JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;

  store.editMode = false;
  switch (action) {
    // dodaj list (wych) -> otwarcie modala
    case "addWaybillIn":
      store.shipmentModalActive = true;
      store.addWaybillModalActive = true;
      break;

    // do serwisu -> status na Oczekuje na dostarczenie (2)
    case "toService":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 2,
      });
      break;

    case "toDiagnose":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 3,
      });
      break;

    //odbierz -> status na Diagnoza (3)
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

    //części -> status na Oczekuje na części (4)
    case "wait":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 4,
      });
      break;

    //zleć kontakt -> status na Kontakt z klientem (10)
    //dopisac modal kontaktu
    case "contact":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 10,
      });

      // if (warehouseModuleActive) {
      //   warehouseStore.changeItemShevle({
      //     from: "SH_INDIN_1",
      //     to: "SH_OUTDIN_1",
      //     item: [store.rmaPage.barcode],
      //   });
      // }
      break;

    //anuluj (w serwisie) -> status do anulowania (8)
    //dopisac modal powodu anulowania
    case "toCancel":
      let toCancelError = false;
      if (store.rmaPage.result_type === null) {
        store.rmaPageErrors.resultType = "Uzupełnij rezultat";
        toCancelError = true;
      }
      if (toCancelError) {
        store.showSnackBar({
          text: "Uzupełnij wymagane pola",
          color: "Warning",
        });
      } else {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 8,
        });

        // if (warehouseModuleActive) {
        //   warehouseStore.changeItemShevle({
        //     from: "SH_INWER_1",
        //     to: "SH_OUTWER_2",
        //     item: [store.rmaPage.barcode],
        //   });
        // }
      }
      break;

    //naprawa -> status na W realizacji (5)
    case "repair":
      let diagError = false;
      if (store.rmaPage.device_sn === "") {
        store.rmaPageErrors.sn = "Uzupełnij numer seryjny";
        diagError = true;
      }

      if (store.deviceAccessories.length === 0) {
        store.rmaPageErrors.accessories = "Uzupełnij akcesoria";
        diagError = true;
      }

      if (store.rmaPage.damage_type === null) {
        store.rmaPageErrors.damageType = "Uzupełnij stan techniczny";
        diagError = true;
      }

      if (diagError) {
        store.showSnackBar({
          text: "Uzupełnij wymagane pola",
          color: "Warning",
        });
      } else {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 5,
        });
      }

      break;

    //zakończ -> status na Przekazano do odesłania (6)
    case "endRepair":
      let endRepairError = false;
      if (store.rmaPage.result_type === null) {
        store.rmaPageErrors.resultType = "Uzupełnij rezultat";
        endRepairError = true;
      }
      if (store.rmaPage.result_description === null) {
        store.rmaPageErrors.resultDescription = "Uzupełnij opis rezultatu";
        endRepairError = true;
      }
      if (store.actions.length === 0) {
        store.rmaPageErrors.actions = "Uzupełnij wykonane czynności";
        endRepairError = true;
      }
      if (store.actionsTotalPrice > 0 && !store.fvNumber) {
        store.rmaPageErrors.invoice = "Wygeneruj fakturę";
        endRepairError = true;
      }

      if (endRepairError) {
        store.showSnackBar({
          text: "Uzupełnij wymagane pola",
          color: "Warning",
        });
      } else {
        store.changeTicketStatus({
          ticketId: store.rmaPage.ticket_id,
          status: 6,
        });
        store.saveTicketData();

        // if (warehouseModuleActive) {
        //   warehouseStore.changeItemShevle({
        //     from: "SH_INDIN_1",
        //     to: "SH_OUTDIN_1",
        //     item: [store.rmaPage.barcode],
        //   });
        // }
      }
      break;

    //Dodaj list (wychodzący) -> otwarcie modala listów
    case "addWaybillOut":
      store.shipmentModalActive = true;
      store.addWaybillModalActive = true;
      break;

    //Wyślij -> status na Zakończone (7)
    case "send":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 7,
      });

      // if (warehouseModuleActive) {
      //   warehouseStore.removeItem({
      //     barcode: store.rmaPage.barcode,
      //     shelve: 9,
      //     ticket_id: store.rmaPage.ticket_id,
      //   });
      // }
      break;

    //wizyta u klienta -> status na Oczekuje na wizytę technika (11)
    //dopisać modal daty wizyty
    case "visit":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 11,
      });
      break;

    //Anuluj -> status na Anulowano (9)
    case "sendCanceled":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 9,
      });

      // if (warehouseModuleActive) {
      //   warehouseStore.removeItem({
      //     barcode: store.rmaPage.barcode,
      //     shelve: 9,
      //     ticket_id: store.rmaPage.ticket_id,
      //   });
      // }
      break;

    //Anuluj - status na Anulowano (9)
    case "cancel":
      store.changeTicketStatus({
        ticketId: store.rmaPage.ticket_id,
        status: 9,
      });
      break;
  }
};
