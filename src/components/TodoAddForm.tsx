import { useRef } from "react";

type Props = {
  handleAddTodoTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodoDetail: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void;
};

const TodoAddForm = ({
  handleAddTodoTitle,
  handleAddTodoDetail,
  handleAddTodo,
}: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);

  const handleResetForm = (): void => {
    if (titleRef.current !== null) {
      titleRef.current.value = "";
    }
    if (detailRef.current !== null) {
      detailRef.current.value = "";
    }
  };

  return (
    <form className="todoAddForm todo__addFormArea" onSubmit={handleAddTodo}>
      <div className="todoAddForm__itemArea">
        <label htmlFor="todoAddForm__title" className="todoAddForm__label">
          タイトル
        </label>
        <input
          type="text"
          name="title"
          className="todoAddForm__title"
          id="todoAddForm__title"
          placeholder="タスク名を入力"
          onChange={handleAddTodoTitle}
          ref={titleRef}
        />
      </div>

      <div className="todoAddForm__itemArea">
        <label htmlFor="todoAddForm__detail" className="todoAddForm__label">
          詳細
        </label>
        <textarea
          name="detail"
          className="todoAddForm__detail"
          id="todoAddForm__detail"
          placeholder="タスクの詳細（省略可）"
          onChange={handleAddTodoDetail}
          ref={detailRef}
        />
      </div>

      <div className="todoAddForm__submitArea">
        <input
          type="submit"
          value="追加"
          className="todoAddForm__submit"
          onClick={handleResetForm}
        />
      </div>
    </form>
  );
};

export default TodoAddForm;
