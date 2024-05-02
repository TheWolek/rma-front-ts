export type WaybillStatus = "potwierdzony" | "odebrany" | "anulowany";

export type WaybillType = "przychodzący" | "wychodzący";

export type SnackBarColor = "Warning" | "Info";

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
  log_id: number;
  created: Date | string;
  action: string;
  log_before: string | null;
  log_after: string;
  login: string;
  ticket_id: number;
}

export interface CreateActionData {
  action_name: string;
  action_price: number;
  ticket_id: number;
}

export interface TicketAction extends CreateActionData {
  action_id: number;
}

export interface CreateTicketDeviceData {
  deviceCategory: string;
  deviceProducer: string;
  deviceName: string;
  deviceSn: string;
}

export interface CreateTicketRequesterData {
  name: string;
  phone: string;
  email: string;
}

export interface CreateTicketIssueData {
  type: string;
  issue: string;
}

export interface CreateTicketAddressData {
  lines: string;
  postCode: string;
  city: string;
}

export interface CreateTicketData {
  firstStep: CreateTicketDeviceData;
  secondStep: CreateTicketIssueData;
  thirdStep: CreateTicketRequesterData;
  addressSection: CreateTicketAddressData;
}

export interface SnackBarProps {
  text: string;
  color?: SnackBarColor;
  icon?: string;
}
