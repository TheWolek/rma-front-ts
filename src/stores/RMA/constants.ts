export type WaybillStatus = "potwierdzony" | "odebrany" | "anulowany";

export type WaybillType = "przychodzący" | "wychodzący";

export interface Waybill {
  id: number;
  waybill_number: string;
  ticket_id: number;
  status: string;
  type: string;
  created: string;
  lastUpdate: string | null;
}

export interface CreateWaybillData {
  ticket_id: number;
  waybillNumber: string;
  type: WaybillType;
}
