import {
  Fragment,
  useState,
} from 'react';

import { useSnackbar } from 'notistack';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';

import Buttons from '../../Components/Button/Button';
import ListDisplay from '../../Components/ListDisplay/ListDisplay';
import {
  addToDos,
  editItem,
  removeItem,
  setFilter,
  toggleComplete,
} from './ToDoSlice';

const ToDo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [task, setTask] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  const todos = useSelector((state) => {
    if (state.todos.filter === "Pending") {
      return state.todos.todos.filter((ele) => !ele.completed);
    } else if (state.todos.filter === "Completed") {
      return state.todos.todos.filter((ele) => ele.completed);
    } else {
      return state.todos.todos;
    }
  });

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addToDos(task));
      enqueueSnackbar("Task added successfully", { variant: "success" });
      setTask("");
    } else {
      enqueueSnackbar("Please write a task to add", { variant: "warning" });
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
    enqueueSnackbar("Task deleted successfully", { variant: "info" });
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleCheck = (id) => {
    dispatch(toggleComplete(id));
    enqueueSnackbar("Task status updated", { variant: "success" });
  };

  const editList = (id, text) => {
    if (text.trim()) {
      dispatch(editItem({ id, text }));
      enqueueSnackbar("Task updated successfully", { variant: "success" });
    } else {
      enqueueSnackbar("Text should not be empty", { variant: "warning" });
    }
  };

  const applyFilter = (filter) => {
    setCurrentFilter(filter);
    dispatch(setFilter(filter));
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0",
        }}
      >
        <TextField
          id="standard-basic"
          label="Add Task Here"
          variant="standard"
          value={task}
          onChange={handleChange}
        />
        <Buttons handleClick={handleAddTask} text={"Add to List"} />
      </Box>
      <Box>
        {todos.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No Task To Display
          </Typography>
        ) : (
          todos.map((ele) => (
            <ListDisplay
              task={ele}
              key={ele.id}
              onDelete={handleDelete}
              handleCheck={handleCheck}
              editList={editList}
            />
          ))
        )}
        <Box
          display={"flex"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "1rem",
          }}
        >
          <Button
            variant={currentFilter === "All" ? "contained" : "outlined"}
            onClick={() => applyFilter("All")}
          >
            All
          </Button>
          <Button
            variant={currentFilter === "Completed" ? "contained" : "outlined"}
            onClick={() => applyFilter("Completed")}
          >
            Completed
          </Button>
          <Button
            variant={currentFilter === "Pending" ? "contained" : "outlined"}
            onClick={() => applyFilter("Pending")}
          >
            Pending
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ToDo;
