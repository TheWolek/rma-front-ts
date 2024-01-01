export interface Task {
  name: string;
  displayName: string;
  active: number;
  shelve_out: number;
  shelve_in: number;
}

export interface TaskItem {
  item_id: number;
  barcode: string;
}
