import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeFilterChange, FILTER_TITLES } from "../../reducers/filtersSlice";
import { removeCompleted } from "../../reducers/todoSlice";
import "./footer.scss";

const Footer = () => {
  const activeFilter = useSelector((state) => state.activeFilter);
  const incompletedTodoCount = useSelector(
    (state) => state.todos.filter((item) => item.completed === false).length
  );
  const completedTodoCount = useSelector(
    (state) => state.todos.filter((item) => item.completed === true).length
  );

  const itemWord = incompletedTodoCount === 1 ? "task" : "tasks";

  useEffect(() => {
    localStorage.setItem("activeFilter", JSON.stringify(activeFilter));
  }, [activeFilter]);

  const dispatch = useDispatch();

  const renderFilters = (arr) => {
    return arr.map((filter) => {
      const filterClass = classNames("btn", {
        btn__active: filter === activeFilter,
      });

      return (
        <li key={filter}>
          <button
            className={filterClass}
            onClick={() => dispatch(activeFilterChange(filter))}
          >
            {filter}
          </button>
        </li>
      );
    });
  };

  const onClearCompleted = () => {
    dispatch(removeCompleted());
  };

  const filters = renderFilters(FILTER_TITLES);

  return (
    <footer className='footer'>
      <span className='todo-count'>
        {incompletedTodoCount || "No"} {itemWord} left
      </span>
      <ul className='footer_filters'> {filters}</ul>
      {!!completedTodoCount && (
        <button
          className='btn footer_remove'
          onClick={() => onClearCompleted()}
        >
          Remove completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
