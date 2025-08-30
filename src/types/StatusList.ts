import type { TodoStatusName } from "./TodoStatusName";

export type StatusList = {
  readonly id: number;
  name: TodoStatusName;
  label: string | "";
};
