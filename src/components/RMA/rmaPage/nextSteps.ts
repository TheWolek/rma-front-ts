import { useRmaStore } from "@/stores/RMA";

export default (): string[] => {
  const store = useRmaStore();
  const status = store.rmaPage.status;
  const waybills = store.waybills;
  const output = [];

  //Nowy
  if (status === 1) {
    output.push("cancel");

    const waybill = waybills.find((waybill) => waybill.type === "przychodzący");
    if (waybill?.status === "potwierdzony") {
      output.push("toService");
    } else {
      output.push("addWaybillIn");
    }
  }

  //Oczekuje na dostarczenie
  if (status === 2) {
    output.push("collect");
  }

  //Przyjęto w serwisie
  if (status === 3) {
    output.push("toDiagnose");
    output.push("toCancel");
  }

  //Przekazano do diagnozy
  if (status === 4) {
    output.push("repair");
  }

  //W realizacji
  if (status === 5) {
    output.push("contact");
    output.push("endRepair");
    output.push("toCancel");
  }

  //Zlecono kontakt
  if (status === 7) {
    output.push("repair");
    output.push("toCancel");
  }

  //Przekazano do odesłania
  if (status === 8) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("send");
    } else {
      output.push("addWaybillOut");
    }
  }

  //Koniec
  if (status === 9) {
    output.push("end");
  }

  //Do anulowania
  if (status === 11) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("sendCanceled");
    } else {
      output.push("addWaybillOut");
    }
  }

  return output;
};
