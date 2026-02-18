import {
  newTaskBtn,
  deleteBtn,
  closeFullCardBtn,
  cancelTaskBtn,
  saveTaskBtn,
  toggleBtn,
  storageToggleBtn,
  lists,
  tasks,
  setActiveIndex,
} from "./data.js";

import { showFullCard, hideFullCard } from "./fullCard.js";
import { saveTask, deleteTask } from "./tasks.js";
import { renderTasks, switchTheme, updateStorageButtonText } from "./ui.js";
import { saveAllTasks } from "./storage.js";
import { initializeTasks } from "./data.js";
import { toggleStorageMode } from "./storageAdapter.js";

/* ===== INIT ===== */
async function init() {
  await initializeTasks(); // load from DB or localStorage
  renderTasks();
  updateStorageButtonText(); // set initial button text
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
storageToggleBtn.addEventListener("click", toggleStorageMode);

/* ===== DRAG & DROP ===== */

Object.values(lists).forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());

  list.addEventListener("drop", async (e) => {
    const index = e.dataTransfer.getData("text/plain");
    tasks[index].status = list.dataset.status;
    await saveAllTasks(); // ✅ persist status change to DB
    renderTasks();
  });
});
