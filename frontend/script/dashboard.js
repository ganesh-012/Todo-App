
let todoState = [];
let oldTodoState = [];
const token = localStorage.getItem("token");

async function markAsDone(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
      }),
    });

    if (response.status === 200) {
      alert("Updated successfully");
      const newtodo = todoState.map((todo) =>
        todo._id === id ? { ...todo, completed : true } : todo
      );
      todoState = newtodo;
      updateState(newtodo);
    } else {
      alert("Error updating todo");
    }
  } catch (error) {
    alert("Server error while marking as done");
  }
}

async function deleteData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Deleted successfully");
      const newtodo = todoState.filter((todo) => todo._id !== id);
      todoState = newtodo;
      updateState(newtodo);
    } else {
      alert("Error deleting todo");
    }
  } catch (error) {
    alert("Server error while deleting the todo");
  }
}

async function updateData(id) {
  const newTitle = prompt("Enter the new title:");
  const newDescription = prompt("Enter the new description:");

  try {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        completed : false
      }),
    });

    if (response.status === 200) {
      alert("Updated successfully");
      const newtodo = todoState.map((todo) =>
        todo._id === id
          ? { ...todo, title: newTitle, description: newDescription , completed: false}
          : todo
      );
      todoState = newtodo;
      updateState(newtodo);
    } else {
      alert("Error updating todo");
    }
  } catch (error) {
    alert("Server error while updating todo");
  }
}

function createChild(todo) {
  const mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", `todo-${todo._id}`);

  const titleDiv = document.createElement("div");
  titleDiv.innerText = todo.title;
  titleDiv.classList.add("title");

  const descDiv = document.createElement("div");
  descDiv.innerText = todo.description;
  descDiv.classList.add("description");

  const statusDiv = document.createElement("div");
  statusDiv.innerText = "status : " + (todo.completed ? "Done.!" : "pending..");
  statusDiv.classList.add("status");

  const doneBtn = document.createElement("button");
  doneBtn.innerText = todo.completed ? "Done!" : "mark as done"
  doneBtn.setAttribute("onclick", `markAsDone('${todo._id}')`);
  doneBtn.classList.add("done");

  const updateBtn = document.createElement("button");
  updateBtn.innerText = "Update";
  updateBtn.setAttribute("onclick", `updateData('${todo._id}')`);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("onclick", `deleteData('${todo._id}')`);

  mainDiv.appendChild(titleDiv);
  mainDiv.appendChild(descDiv);
  mainDiv.appendChild(statusDiv);
  mainDiv.appendChild(doneBtn);
  mainDiv.appendChild(updateBtn);
  mainDiv.appendChild(deleteBtn);
 
  return mainDiv;
}

async function loadtodos() {
  try {
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      todoState = data.todos;
      updateState(todoState);
    }
  } catch (error) {
    alert("Server error");
  }
}

window.onload = function () {
  if (!token) {
    alert("Please login first");
    return (window.location.href = "/login.html");
  }
  loadtodos();
};

async function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (!token) {
    alert("Login the user");
    return (window.location.href = "/login.html");
  }

  try {
    if (!title || !description) {
      return alert("Please fill all the fields");
    }
    const response = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.status === 200) {
      const data = await response.json();
      alert(data.msg);
      todoState.push(data.newTodo);
      updateState(todoState);
    } else {
      const data = await response.json();
      return alert("Error in adding todo: " + data.msg);
    }
  } catch (error) {
    alert("Server error.");
  }
}


// diffing algorithms starts now...

function addTodoToDom(todo) {
  const parent = document.getElementById("todo-items");
  const existing = document.getElementById(`todo-${todo._id}`);
  if (!existing) {
    parent.appendChild(createChild(todo));
  }
}

function deleteTodoToDom(todo) {
  const element = document.getElementById(`todo-${todo._id}`);
  if (element) {
    element.remove();
  }
}

function updateTodoToDom(todo) {
  const element = document.getElementById(`todo-${todo._id}`);
  console.log(element);
  if (element) {
    element.querySelector(".title").innerText = todo.title;
    element.querySelector(".description").innerText = todo.description;
    element.querySelector(".status").innerText = todo.completed
      ? "Done"
      : "pending..";
    element.querySelector(".done").innerText = todo.completed
      ? "done.!"
      : "Mark as done";
  }
}

function updateState(newTodos) {
  const newMap = {};
  const oldMap = {};
  const added = [];
  const deleted = [];
  const updated = [];

  newTodos.forEach((element) => {
    newMap[element._id] = element;
  });

  oldTodoState.forEach((element) => {
    oldMap[element._id] = element;
  });

  for (let id in newMap) {
    if (!oldMap[id]) {
      added.push(newMap[id]);
    } else {
      const newItem = newMap[id];
      const oldItem = oldMap[id];
      if (
        newItem.title !== oldItem.title ||
        newItem.description !== oldItem.description ||
        newItem.completed !== oldItem.completed
      ) {
        updated.push(newMap[id]);
      }
    }
  }

  for (let id in oldMap) {
    if (!newMap[id]) {
      deleted.push(oldMap[id]);
    }
  }

  added.forEach((todo) => addTodoToDom(todo));
  deleted.forEach((todo) => deleteTodoToDom(todo));
  updated.forEach((todo) => updateTodoToDom(todo));

  oldTodoState = [...newTodos];
}


