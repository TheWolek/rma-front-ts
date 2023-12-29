export type CollectStatus = "Odebrany" | "W trakcie" | "Anulowany";

export interface CollectItem {
  waybill: string;
  ticket_id: number;
  barcode: string;
}

export interface Collect {
  id: number;
  ref_name: string;
  created: string | Date;
  status: CollectStatus;
}
