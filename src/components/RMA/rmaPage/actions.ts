import { useRmaStore } from "@/stores/RMA";
export default (action: string) => {
  const store = useRmaStore();
  switch (action) {
    case "addWaybillIn":
      break;

    case "toService":
      break;

    case "collect":
      const waybillIn = store.waybills.find(
        (waybill) => waybill.type === "przychodzący"
      );
      console.log(waybillIn);
      break;

    case "toDiagnose":
      break;

    case "contact":
      break;

    case "repair":
      break;

    case "endRepair":
      break;

    case "addWaybillOut":
      break;

    case "send":
      break;

    case "sendCancelled":
      break;

    case "cancel":
      break;

    case "toCancel":
      break;
  }
};
