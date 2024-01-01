import { useRmaStore } from "@/stores/RMA";
import { useUserStore } from "@/stores/user";

export default (): string[] => {
  const store = useRmaStore();
  const userStore = useUserStore();
  const status = store.rmaPage.status;
  const waybills = store.waybills;
  const userRole = userStore.userRole;
  const output = [];

  //Nowy
  if (status === 1 && ["CC", "Admin"].includes(userRole)) {
    output.push("cancel");

    const waybill = waybills.find((waybill) => waybill.type === "przychodzący");
    if (waybill?.status === "potwierdzony") {
      output.push("toService");
    } else {
      output.push("addWaybillIn");
    }
  }

  //Oczekuje na dostarczenie
  if (status === 2 && ["Admin"].includes(userRole)) {
    output.push("collect");
  }

  //Przyjęto w serwisie
  if (status === 3 && ["TECH", "LS", "Admin"].includes(userRole)) {
    output.push("toDiagnose");
    output.push("toCancel");
  }

  //Przekazano do diagnozy
  if (status === 4 && ["TECH", "LS", "Admin"].includes(userRole)) {
    output.push("repair");
  }

  //W realizacji
  if (status === 5 && ["TECH", "Admin"].includes(userRole)) {
    output.push("contact");
    output.push("endRepair");
    output.push("toCancel");
  }

  //Zlecono kontakt
  if (status === 7 && ["CC", "TECH", "Admin"].includes(userRole)) {
    output.push("repair");
    output.push("toCancel");
  }

  //Przekazano do odesłania
  if (status === 9 && ["LS", "TECH", "Admin"].includes(userRole)) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("send");
    } else {
      output.push("addWaybillOut");
    }
  }

  //Koniec
  if (status === 9 && ["LS", "Admin"].includes(userRole)) {
    output.push("end");
  }

  //Do anulowania
  if (status === 11 && ["LS", "CC", "Admin"].includes(userRole)) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("sendCanceled");
    } else {
      output.push("addWaybillOut");
    }
  }

  return output;
};
