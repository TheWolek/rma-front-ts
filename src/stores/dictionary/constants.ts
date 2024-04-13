export interface DictionaryItem {
  id: number;
  name: string;
}

export interface Dictionary {
  id: number;
  name: string;
  displayName: string;
  url: string;
  mutation: string;
  items: DictionaryItem[];
}

export interface Processes {
  [key: string]: number[];
}
