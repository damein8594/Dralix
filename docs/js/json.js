const API = "http://localhost:5000/api/tasks";

// Create a brand new task in the DB, returns the saved task (with real id)
export async function createTaskInApi(task) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      status: task.status,
      description: task.description,
      storyPoint: task.storyPoint,
    }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json(); // returns task with real DB id
}

// Update an existing task in the DB by its id
export async function updateTaskInApi(task) {
  const res = await fetch(`${API}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: task.title,
      status: task.status,
      description: task.description,
      storyPoint: task.storyPoint,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update task ${task.id}`);
  return await res.json();
}

// Delete a task from the DB by its id
export async function deleteTaskInApi(taskId) {
  const res = await fetch(`${API}/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete task ${taskId}`);
}

// Load all tasks from the DB
export async function getFromApi() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
}
