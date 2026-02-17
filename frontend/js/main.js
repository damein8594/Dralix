import {
  newTaskBtn,
  deleteBtn,
  closeFullCardBtn,
  cancelTaskBtn,
  saveTaskBtn,
  toggleBtn,
  lists,
  tasks,
  setActiveIndex,
} from "./data.js";

import { showFullCard, hideFullCard } from "./fullCard.js";
import { saveTask, deleteTask } from "./tasks.js";
import { renderTasks, switchTheme } from "./ui.js";
import { saveAllTasks } from "./storage.js";
import { initializeTasks } from "./data.js";

/* ===== INIT ===== */
// tasks.sort((a, b) => b.storyPoint - a.storyPoint);

async function init() {
  await initializeTasks();
  saveAllTasks();
  renderTasks();
}

init();

/* ===== EVENTS ===== */

newTaskBtn.addEventListener("click", () => {
  setActiveIndex(null);
  showFullCard(null, null);
});

deleteBtn.addEventListener("click", deleteTask);

closeFullCardBtn.addEventListener("click", hideFullCard);
cancelTaskBtn.addEventListener("click", hideFullCard);
saveTaskBtn.addEventListener("click", saveTask);

toggleBtn.addEventListener("click", switchTheme);

/* ===== DRAG & DROP ===== */

Object.values(lists).forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", (e) => {
    const index = e.dataTransfer.getData("text/plain");
    tasks[index].status = list.dataset.status;
    saveAllTasks();
    renderTasks();
  });
});
