export interface CreateNewItemData {
  barcode: string;
  sn: string;
}

export interface ItemRow {
  item_id: number;
  ticket_id: number;
  barcode: string;
  category: string;
  name: string;
  shelve: number;
  shelve_code: string;
  sn: string;
}

export interface Shelve {
  shelve_id: number;
  code: string;
}

export interface ChangeShelveItem {
  barcode: string;
  ticketId: string;
  category: string;
  model: string;
}

export type NotificationType = "" | "Success" | "Fail";

export interface DataFromMoveTask {
  taskName: string;
  from: string;
  to: string;
}

export interface ChangeItemShelveData {
  from?: string;
  to?: string;
  item?: string[];
}

export interface RemoveItemData {
  barcode: string;
  shelve: number;
  ticket_id: number;
}
