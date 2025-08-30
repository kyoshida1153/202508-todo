export type Todo = {
  readonly id: string;
  title: string;
  detail: string | "";
  status: TodoStatusName;
  isEditing: boolean;
};
