import { useState, useRef } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { completeTodo, removeTodo, updateTodo } from "../../reducers/todoSlice";
import "./todoItem.scss";

const TodoItem = ({ text, id, completed }) => {
  const [currentTodoValue, setCurrentTodo] = useState(text);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(true);
  const dispatch = useDispatch();

  const handleCurrentChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const onDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const onUpdate = (id, value) => {
    value = value.trim();
    if (value === "") {
      onDelete(id);
    }

    dispatch(
      updateTodo({
        id,
        text: value,
      })
    );
    setCurrentTodo(value);
    inputRef.current.disabled = true;
    setEditing(false);
  };

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setEditing(true);
  };

  const onComplete = (id, completed) => {
    dispatch(
      completeTodo({
        id,
        completed: !completed,
      })
    );
  };

  return (
    <li className='todo-item'>
      <input
        id={id}
        className='todo-item_checkbox'
        type='checkbox'
        checked={completed}
        onChange={() => onComplete(id, completed)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onComplete(id, completed);
          }
        }}
      />

      <label htmlFor={id}></label>

      <input
        className={classNames("todo-item_input", {
          "todo-item_input__completed": completed,
        })}
        ref={inputRef}
        type='text'
        disabled={inputRef}
        value={currentTodoValue}
        onChange={(e) => handleCurrentChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onUpdate(id, currentTodoValue);
          }
        }}
        onBlur={() => onUpdate(id, currentTodoValue)}
      />

      <button
        className={classNames("btn", { btn__active: editing })}
        onClick={() => changeFocus()}
      >
        Edit
      </button>

      <button className='btn' onClick={() => onDelete(id)}>
        Remove
      </button>
    </li>
  );
};

export default TodoItem;
