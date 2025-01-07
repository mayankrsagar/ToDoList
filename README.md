# ToDo Application with React and Redux

This is a **ToDo Application** built using **React**, **Redux**, and **Material-UI**. It allows users to manage their daily tasks efficiently by adding, editing, completing, and deleting tasks. The app also includes task filtering options for better usability.

---

## Features

- **Add Tasks**: Add new tasks to your to-do list.
- **Edit Tasks**: Double-click on a task to edit its content or press Enter after making changes.
- **Delete Tasks**: Remove tasks from the list.
- **Mark as Completed/Pending**: Toggle tasks between completed and pending states.
- **Filter Tasks**: Filter tasks by:
  - All
  - Completed
  - Pending
- **LocalStorage Persistence**: Task data is stored in the browser's local storage for persistence between sessions.
- **Responsive UI**: A modern and responsive design using Material-UI components.

---

## Tech Stack

### Frontend:
- **React**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Material-UI**: For modern and accessible UI components.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mayankrsagar/ToDoList.git
   cd todo-ToDoList

src
.
|-- App
|   `-- Store.jsx
|-- App.css
|-- App.jsx
|-- Components
|   |-- Button
|   |   `-- Button.jsx
|   `-- ListDisplay
|       `-- ListDisplay.jsx
|-- Features
|   `-- ToDo
|       |-- ToDo.jsx
|       `-- ToDoSlice.jsx
|-- index.css
`-- main.jsx
