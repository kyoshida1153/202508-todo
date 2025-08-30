import type { JSX } from "react";
import type { StatusList } from "../types/StatusList";

type Props = {
  statusList: StatusList[];
  handleFilterStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const todoFilter = ({ statusList, handleFilterStatus }: Props) => {
  const statusElements = (): JSX.Element[] => {
    const newStatusList = [
      {
        id: 99,
        name: "all",
        label: "すべて",
      },
      ...statusList,
    ];

    const elements: JSX.Element[] = newStatusList.map((status) => {
      const key: string = `todoFilterStatus_${status.id}`;
      return (
        <option key={key} value={status.name}>
          {status.label}
        </option>
      );
    });

    return elements;
  };

  return (
    <section className="todoFilter todo_filterArea">
      <div className="todoFilter__item">
        <h2 className="todoFilter__heading">絞り込み</h2>
      </div>
      {/* <div className="todoFilter__item">
        <label htmlFor="todoFilter__id" className="todoFilter__label">
          ID
        </label>
        <input type="text" className="todoFilter__id" id="todoFilter__id" />
      </div> */}
      <div className="todoFilter__item">
        <label htmlFor="todoFilter__status" className="todoFilter__label">
          進捗
        </label>
        <select
          name=""
          className="todoFilter__status"
          id="todoFilter__status"
          onChange={handleFilterStatus}
        >
          {statusElements()}
        </select>
      </div>
    </section>
  );
};

export default todoFilter;
