export type WaybillStatus = "potwierdzony" | "odebrany" | "anulowany";

export type WaybillType = "przychodzący" | "wychodzący";

export type FilterType =
  | "zgłoszenie"
  | "status"
  | "typ"
  | "sn"
  | "producent"
  | "list";

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

export interface Filter {
  name: FilterType;
  value: string;
}

export interface Ticket {
  ticket_id: number;
  device_cat: string;
  device_name: string;
  device_producer: string;
  status: number;
  type: number;
  created: string;
  lastStatusUpdate: string | null;
}
