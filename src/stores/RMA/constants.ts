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
  status: WaybillStatus;
  type: WaybillType;
  created: string;
  lastUpdate: string | null;
}

export interface CreateWaybillData {
  ticketId: number;
  waybillNumber: string;
  type: WaybillType;
}

export interface Filter {
  name: FilterType;
  value: string;
}

export interface Ticket {
  ticket_id: number;
  barcode: string;
  device_cat: string;
  device_name: string;
  device_producer: string;
  status: number;
  type: number;
  created: string;
  lastStatusUpdate: string | null;
}

export interface ChangeTicketStatusData {
  ticketId: number;
  status: number;
}

export interface HistoryRow {
  action: string;
  log: string;
  created: Date | string;
  log_id: number;
  login: string;
  user_id: number;
  ticket_id: number;
}
