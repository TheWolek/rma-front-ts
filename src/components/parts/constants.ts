export type InputType = "text" | "password" | "number";

export type KeyboardEventHandler =
  | ((payload: KeyboardEvent) => void)
  | undefined;

export type MouseEventHandler = (payload: MouseEvent) => void;

export type CommonEventHandler = (() => void) | undefined;

export type SelectOption = {
  id: string | number;
  name: string;
};
