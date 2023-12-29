export type CollectStatus = "Odebrany" | "W trakcie" | "Anulowany";

export interface CollectItem {
  waybill: string;
  ticket_id: number;
  barcode: string;
}
