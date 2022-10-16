/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { filteredTodosSelector } from "../../reducers/todoSlice";
import TodoItem from "../todoItem/TodoItem";
import "./todoList.scss";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filteredTodos = useSelector(filteredTodosSelector);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const renderTodos = (arr) => {
    if (arr.length === 0) {
      return <h3>Todo list is empty</h3>;
    }

    return arr.map(({ id, ...props }) => {
      return <TodoItem key={id} {...props} id={id} />;
    });
  };

  const elements = renderTodos(filteredTodos);

  return <ul className='todo-list'> {elements}</ul>;
};

export default TodoList;
