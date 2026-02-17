import { tasks } from "./data.js";

export function saveAllTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
