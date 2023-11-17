export interface DictionaryData {
  displayName: string;
  id: number;
  mutation: string;
  name: string;
  url: string;
  items: DictionaryItem[];
}

export interface DictionaryItem {
  id: number;
  name: string;
}
