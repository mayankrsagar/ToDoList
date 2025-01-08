import {
  Fragment,
  useEffect,
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
const [currentPage,setCurrentPage]=useState(1);

const itemsPerPage = 4;

  const todos = useSelector((state) => {
    if (state.todos.filter === "Pending") {
      return state.todos.todos.filter((ele) => !ele.completed);
    } else if (state.todos.filter === "Completed") {
      return state.todos.todos.filter((ele) => ele.completed);
    } else {
      return state.todos.todos;
    }
  });


  const startIndex=(currentPage-1)*itemsPerPage;
  const lastIndex=startIndex + itemsPerPage;

  const currentData=todos.slice(startIndex,lastIndex);

const totalPages=Math.ceil(todos.length/itemsPerPage);

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

const handleEnter=(e)=>{
if(e.key==="Enter"){
  handleAddTask();
}
}

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (e.key === "ArrowRight") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [totalPages]);



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
          onKeyDown={handleEnter}
          aria-label='Add Task'
        />
        <Buttons handleClick={handleAddTask} text={"Add to List"} />
      </Box>
      <Box
          display={"flex"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            margin: "1rem 0",
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
      <Box>
        {currentData.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No Task To Display
          </Typography>
        ) : (
          currentData.map((ele) => (
            <ListDisplay
              task={ele}
              key={ele.id}
              onDelete={handleDelete}
              handleCheck={handleCheck}
              editList={editList}
            />
          ))
        )}
        
      </Box>
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"1rem"}}>
      <Button
  variant="outlined"
  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
>
  Previous
</Button>
<Typography>{currentPage}</Typography>
<Button
  variant="outlined"
  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  disabled={currentPage === totalPages}
>
  Next
</Button>

      </Box>
    </Fragment>
  );
};

export default ToDo;
