import type { JSX } from "react";
import type { Todo } from "../types/Todo";
import type { StatusList } from "../types/StatusList";

type Props = {
  todos: Todo[];
  statusList: StatusList[];
  filterStatus: string;
  handleDelete: (id: string) => void;
  handleEditOpen: (id: string) => void;
  handleEditClose: (id: string) => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleChangeStatus: (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => void;
};

const TodoList = ({
  todos,
  statusList,
  filterStatus,
  handleDelete,
  handleEditOpen,
  handleEditClose,
  handleSave,
  handleChangeStatus,
}: Props) => {
  const statusElements = (todoId: string): JSX.Element[] => {
    const elements: JSX.Element[] = statusList.map((status) => {
      const key: string = `${todoId}_${status.id}`;
      return (
        <option key={key} value={status.name}>
          {status.label}
        </option>
      );
    });

    return elements;
  };

  const todoElements = (todos: Todo[]): JSX.Element[] => {
    const filteredTodos = todos.filter((todo) => {
      switch (filterStatus) {
        case "all":
          return true;
          break;
        case todo.status:
          return true;
          break;
        default:
          break;
      }
    });

    const elements = filteredTodos.map((todo) => {
      if (todo.isEditing) {
        return (
          <form
            className="todoListItem"
            key={todo.id}
            onSubmit={(e) => handleSave(e, todo.id)}
            data-status={todo.status}
          >
            <input
              type="text"
              name="title"
              key={todo.title}
              defaultValue={todo.title}
              className="todoListItem__title"
            />
            <textarea
              name="detail"
              className="todoListItem__detail todoListItem__detail_edit"
              defaultValue={todo.detail}
            />
            <div className="todoListItem__operateArea">
              <select
                className="todoListItem__status"
                onChange={(e) => handleChangeStatus(e, todo.id)}
                defaultValue={todo.status}
              >
                {statusElements(todo.id)}
              </select>
              <div className="todoListItem__handleArea">
                <input
                  type="submit"
                  value="保存する"
                  className="todoListItem__button"
                />
                <button
                  className="todoListItem__button"
                  onClick={() => handleEditClose(todo.id)}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </form>
        );
      } else {
        return (
          <section
            className="todoListItem"
            key={todo.id}
            data-status={todo.status}
          >
            <div className="todoListItem__title">{todo.title}</div>
            <div className="todoListItem__detail">{todo.detail}</div>
            <div className="todoListItem__operateArea">
              <select
                className="todoListItem__status"
                onChange={(e) => handleChangeStatus(e, todo.id)}
                defaultValue={todo.status}
              >
                {statusElements(todo.id)}
              </select>
              <div className="todoListItem__handleArea">
                <button
                  className="todoListItem__button todoListItem__edit"
                  onClick={() => handleEditOpen(todo.id)}
                >
                  編集
                </button>
                <button
                  className="todoListItem__button todoListItem__delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  削除
                </button>
              </div>
            </div>
          </section>
        );
      }
    });

    if (elements.length === 0) {
      elements.push(<p key="no_task">選択された条件のタスクはありません。</p>);
    }

    return elements;
  };

  return (
    <section className="todoList todo__listArea">
      {todoElements(todos)}
      {/* {todos.map((todo) =>
        todo.isEditing ? (
          <form
            className="todoListItem"
            key={todo.id}
            onSubmit={(e) => handleSave(e, todo.id)}
          >
            <input
              type="text"
              name="title"
              key={todo.title}
              defaultValue={todo.title}
              className="todoListItem__title"
            />
            <textarea
              name="detail"
              className="todoListItem__detail todoListItem__detail_edit"
              defaultValue={todo.detail}
            />
            <div className="todoListItem__operateArea">
              <select
                className="todoListItem__status"
                onChange={(e) => handleChangeStatus(e, todo.id)}
                defaultValue={todo.status}
              >
                {statusElements(todo.id)}
              </select>
              <div className="todoListItem__handleArea">
                <input
                  type="submit"
                  value="保存する"
                  className="todoListItem__button"
                />
                <button
                  className="todoListItem__button"
                  onClick={() => handleEditClose(todo.id)}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </form>
        ) : (
          <section className="todoListItem" key={todo.id}>
            <div className="todoListItem__title">{todo.title}</div>
            <div className="todoListItem__detail">{todo.detail}</div>
            <div className="todoListItem__operateArea">
              <select
                className="todoListItem__status"
                onChange={(e) => handleChangeStatus(e, todo.id)}
                defaultValue={todo.status}
              >
                {statusElements(todo.id)}
              </select>
              <div className="todoListItem__handleArea">
                <button
                  className="todoListItem__button todoListItem__edit"
                  onClick={() => handleEditOpen(todo.id)}
                >
                  編集
                </button>
                <button
                  className="todoListItem__button todoListItem__delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  削除
                </button>
              </div>
            </div>
          </section>
        )
      )} */}
    </section>
  );
};

export default TodoList;
