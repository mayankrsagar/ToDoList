import { v4 as uuidv4 } from 'uuid';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: JSON.parse(localStorage.getItem("taskList"))||[],
  filter: "All"
};

export const toDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addToDos: (state, action) => {
      state.todos.push({
        id: uuidv4(),
        text: action.payload,
        completed: false
      });
      localStorage.setItem("taskList",JSON.stringify(state.todos));
    },
    removeItem: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem("taskList",JSON.stringify(state.todos));
    },
    editItem: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      localStorage.setItem("taskList",JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      localStorage.setItem("taskList",JSON.stringify(state.todos));
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // e.g., "All", "Completed", "Pending"

    }
  }
});

// Action creators are generated for each case reducer function
export const { addToDos, removeItem, editItem, toggleComplete, setFilter } = toDoSlice.actions;

export default toDoSlice.reducer;
