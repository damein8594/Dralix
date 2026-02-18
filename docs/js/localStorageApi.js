const STORAGE_KEY = "dralix_tasks";

// Helper to get all tasks from localStorage
function getAllTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Helper to save all tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Create a brand new task in localStorage, returns the saved task (with generated id)
export async function createTaskInApi(task) {
  const tasks = getAllTasks();
  const newTask = {
    id: Date.now(), // simple ID generation using timestamp
    title: task.title,
    status: task.status,
    description: task.description,
    storyPoint: task.storyPoint,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

// Update an existing task in localStorage by its id
export async function updateTaskInApi(task) {
  const tasks = getAllTasks();
  const index = tasks.findIndex((t) => t.id === task.id);

  if (index === -1) {
    throw new Error(`Task with id ${task.id} not found`);
  }

  tasks[index] = {
    id: task.id,
    title: task.title,
    status: task.status,
    description: task.description,
    storyPoint: task.storyPoint,
  };

  saveTasks(tasks);
  return tasks[index];
}

// Delete a task from localStorage by its id
export async function deleteTaskInApi(taskId) {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((t) => t.id !== taskId);

  if (filteredTasks.length === tasks.length) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  saveTasks(filteredTasks);
}

// Load all tasks from localStorage
export async function getFromApi() {
  return getAllTasks();
}
