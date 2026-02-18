import { tasks } from "./data.js";
import { updateTaskInApi } from "./storageAdapter.js";

// Persist all tasks to the DB (used after drag/drop or status changes)
export async function saveAllTasks() {
  try {
    await Promise.all(tasks.map((task) => updateTaskInApi(task)));
  } catch (err) {
    console.error("Failed to save tasks to API:", err);
  }
}
