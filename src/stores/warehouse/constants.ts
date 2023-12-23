export interface CreateNewItemData {
  barcode: string;
  sn: string;
}

export interface ItemRow {
  item_id: number;
  ticket_id: number;
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
