import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

const ListDisplay = ({ task, onDelete, handleCheck, editList }) => {
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState(task.text);

  const handleEdit = () => {
    if (editTask.trim() !== task.text) {
      editList(task.id, editTask.trim());
    }
    setEdit(false);

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 1,
        marginBottom: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Checkbox for task completion */}
        <Checkbox
          checked={task.completed}
          onChange={() => handleCheck(task.id)}
        />

        {/* Task text or editing field */}
        {edit ? (
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            onBlur={handleEdit} // Save task on losing focus
            onKeyDown={handleKeyDown} // Save task on pressing Enter
            autoFocus
            size="small"
          />
        ) : (
          <Typography
            variant="body1"
            onDoubleClick={() => setEdit(true)} // Enable edit on double click
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {task.text}
          </Typography>
        )}
      </Box>

      {/* Delete button */}
      <IconButton onClick={() => onDelete(task.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ListDisplay;
