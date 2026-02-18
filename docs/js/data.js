import { getFromApi } from "./storageAdapter.js";

export const newTaskBtn = document.querySelector("#newTaskBtn");
export const deleteBtn = document.getElementById("deleteBtn");
export const closeFullCardBtn = document.getElementById("closeFullCard");
export const cancelTaskBtn = document.getElementById("cancelTaskBtn");
export const saveTaskBtn = document.getElementById("saveTaskBtn");
export const toggleBtn = document.getElementById("toggleTheme");
export const storageToggleBtn = document.getElementById("toggleStorage");

export const lists = {
  todo: document.querySelector("#todoList"),
  doing: document.querySelector("#doingList"),
  done: document.querySelector("#doneList"),
};

export let activeIndex = null;
export function setActiveIndex(value) {
  activeIndex = value;
}

export let tasks = [];

// Remove a task from the local array by reference
export function changeTasks(task) {
  const index = tasks.indexOf(task);
  if (index !== -1) tasks.splice(index, 1);
}

// Fetch all tasks from the API and populate the local array
export async function initializeTasks() {
  try {
    const fetched = await getFromApi();
    tasks.length = 0; // clear without breaking references
    tasks.push(...fetched); // fill with DB data
  } catch (err) {
    console.error("Failed to load tasks from API:", err);
  }
}
