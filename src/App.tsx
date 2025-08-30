import { useState } from "react";
import TodoAddForm from "./components/TodoAddForm";
import TodoList from "./components/TodoList";
import TodoFIlter from "./components/TodoFIlter";
import type { Todo } from "./types/Todo";
import type { AddTodo } from "./types/AddTodo";
import type { StatusList } from "./types/StatusList";
import type { TodoStatusName } from "./types/TodoStatusName";

function App() {
  const todosSample: Todo[] = [
    {
      id: "sample-1",
      title: "タスク1",
      detail: "タスク1の詳細",
      status: "notStarted",
      isEditing: false,
    },
    {
      id: "sample-2",
      title: "タスク2",
      detail: "タスク2の詳細",
      status: "start",
      isEditing: false,
    },
    {
      id: "sample-3",
      title: "タスク3",
      detail: "タスク3の詳細",
      status: "done",
      isEditing: false,
    },
  ];

  const [addTodo, setAddTodo] = useState<AddTodo>({ title: "", detail: "" });
  const [todos, setTodos] = useState<Todo[]>(todosSample);
  // console.log(todos);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const statusList: StatusList[] = [
    {
      id: 0,
      name: "notStarted",
      label: "未着手",
    },
    {
      id: 1,
      name: "start",
      label: "進行中",
    },
    {
      id: 2,
      name: "done",
      label: "完了",
    },
  ];

  /* ###################################################################### */

  // Add

  const handleAddTodoTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const title = e.target.value;
    setAddTodo({ ...addTodo, title });
  };

  const handleAddTodoDetail = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const detail = e.target.value;
    setAddTodo({ ...addTodo, detail });
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (addTodo.title === "") return;
    const id = crypto.randomUUID();
    const status: TodoStatusName = "notStarted";
    const isEditing: boolean = false;
    const newTodos = [...todos, { ...addTodo, id, status, isEditing }];
    setTodos(newTodos);
    setAddTodo({ title: "", detail: "" });

    // ★
    // e.target.reset();
  };

  /* ###################################################################### */

  // Delete

  const handleDelete = (id: string): void => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  /* ###################################################################### */

  // Edit

  const handleEditOpen = (id: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: true };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleEditClose = (id: string): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditing: false };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  const handleSave = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;

    if (title === "") return;

    const detail = formData.get("detail") as string;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          detail,
          isEditing: false,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  /* ###################################################################### */

  // Status

  const handleChangeStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: e.target.value as TodoStatusName,
        };
      } else {
        return todo;
      }
    });
    setTodos(newTodos);
  };

  /* ###################################################################### */

  // Filter

  const handleFilterStatus = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilterStatus(e.target.value);
  };

  /* ###################################################################### */

  return (
    <>
      <div className="todo">
        <div className="todo__inner">
          <TodoAddForm
            handleAddTodoTitle={handleAddTodoTitle}
            handleAddTodoDetail={handleAddTodoDetail}
            handleAddTodo={handleAddTodo}
          />
          <TodoFIlter
            statusList={statusList}
            handleFilterStatus={handleFilterStatus}
          />
          <TodoList
            todos={todos}
            statusList={statusList}
            filterStatus={filterStatus}
            handleDelete={handleDelete}
            handleEditOpen={handleEditOpen}
            handleEditClose={handleEditClose}
            handleSave={handleSave}
            handleChangeStatus={handleChangeStatus}
          />
        </div>
      </div>
    </>
  );
}

export default App;
