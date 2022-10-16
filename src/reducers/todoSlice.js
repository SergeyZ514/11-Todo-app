import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const savedTodos = localStorage.getItem("todos");

const initialState = savedTodos ? JSON.parse(savedTodos) : [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
      return state;
    },

    removeTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    updateTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
          };
        }
        return todo;
      });
    },

    completeTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: action.payload.completed,
          };
        }
        return todo;
      });
    },

    removeCompleted: (state) => {
      return state.filter((todo) => todo.completed === false);
    },
  },
});

export const filteredTodosSelector = createSelector(
  (state) => state.todos,
  (state) => state.activeFilter,
  (todos, activeFilter) => {
    if (activeFilter === "All") {
      return todos;
    } else if (activeFilter === "Completed") {
      return todos.filter((item) => item.completed === true);
    } else if (activeFilter !== "Completed") {
      return todos.filter((item) => item.completed === false);
    }
  }
);

const { actions, reducer } = todoSlice;

export default reducer;

export const {
  addTodo,
  removeTodo,
  updateTodo,
  completeTodo,
  removeCompleted,
} = actions;
