export type WaybillStatus = "potwierdzony" | "odebrany" | "anulowany";

export type WaybillType = "przychodzący" | "wychodzący";

export interface WaybillRow {
  id: number;
  waybill_number: string;
  ticket_id: number;
  status: WaybillStatus;
  type: WaybillType;
  created: string;
  lastUpdate: string | null;
}
