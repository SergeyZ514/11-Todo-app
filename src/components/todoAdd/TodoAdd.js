import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addTodo } from "../../reducers/todoSlice";
import "./todoAdd.scss";

const TodoAdd = () => {
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const onAdd = (e) => {
    e.preventDefault();

    if (todo.trim() === "") {
      alert("Input is empty");
      setTodo("");
    } else if (e.type === "click" || e.code === "Enter") {
      dispatch(
        addTodo({
          id: nanoid(),
          text: todo.trim(),
          completed: false,
        })
      );
      setTodo("");
    }
  };

  return (
    <form className='todo-add' onSubmit={(e) => onAdd(e)}>
      <input
        className={classNames("todo-add_input", {
          "todo-add_input__active": todo,
        })}
        placeholder='Input new todo'
        type='text'
        value={todo}
        onChange={(e) => handleChange(e)}
      />
      <button className='btn' type='submit' onClick={(e) => onAdd(e)}>
        + TODO
      </button>
    </form>
  );
};

export default TodoAdd;
