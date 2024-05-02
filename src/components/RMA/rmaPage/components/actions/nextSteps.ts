import { useRmaStore } from "@/stores/RMA";
import { useUserStore } from "@/stores/user";

export default (): string[] => {
  const warehouseModuleActive =
    JSON.parse(process.env.VUE_APP_MODULE_WAREHOUSE) || false;
  const store = useRmaStore();
  const userStore = useUserStore();
  const status = store.rmaPage.status;
  const waybills = store.waybills;
  const userRole = userStore.userRole;
  const output = [];

  //status: Nowy (1)
  if (status === 1 && ["CC", "Admin"].includes(userRole)) {
    output.push("cancel");
    output.push("visit");

    const waybill = waybills.find((waybill) => waybill.type === "przychodzący");
    if (waybill?.status === "potwierdzony") {
      output.push("toService");
    } else {
      output.push("addWaybillIn");
    }
  }

  //status: Oczekuje na dostarczenie (2)
  if (status === 2) {
    if (warehouseModuleActive && ["Admin"].includes(userRole)) {
      output.push("collect");
    } else if (["Admin", "TECH", "LS"].includes(userRole)) {
      output.push("collect");
    }
  }

  //status: Diagnoza (3)
  if (status === 3 && ["TECH", "Admin"].includes(userRole)) {
    output.push("contact");
    output.push("toCancel");
    output.push("wait");
    output.push("repair");
  }

  //status: Oczekuje na części (4)
  if (status === 4 && ["TECH", "Admin"].includes(userRole)) {
    output.push("repair");
    output.push("contact");
  }

  //status: W realizacji (5)
  if (status === 5 && ["TECH", "Admin"].includes(userRole)) {
    output.push("endRepair");
  }

  //status: Przekazano do odesłania (6)
  if (status === 6 && ["TECH", "LS", "Admin"].includes(userRole)) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("send");
    } else {
      output.push("addWaybillOut");
    }
  }

  //status: Do anulowania (8)
  if (status === 8 && ["LS", "TECH", "Admin"].includes(userRole)) {
    const waybill = waybills.find((o) => o.type === "wychodzący");
    if (waybill) {
      output.push("sendCanceled");
    } else {
      output.push("addWaybillOut");
    }
  }

  //status: Kontakt z klientem (10)
  if (status === 10 && ["CC", "Admin"].includes(userRole)) {
    output.push("toCancel");
    output.push("toDiagnose");
  }

  //status: Oczekuje na wizytę technika (11)
  if (status === 11 && ["CC", "Admin"].includes(userRole)) {
    output.push("toDiagnose");
  }

  // //status: Brakujące informacje (12)
  if (status === 12 && ["CC", "Admin"].includes(userRole)) {
    output.push("cancel");
  }

  return output;
};
