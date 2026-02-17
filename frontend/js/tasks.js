import { tasks, activeIndex, changeTasks } from "./data.js";
import { saveAllTasks } from "./storage.js";
import { hideFullCard } from "./fullCard.js";
import { renderTasks } from "./ui.js";
import { calculateStoryPoint } from "./storyPoint.js";
import { createTaskInApi, deleteTaskInApi } from "./json.js";

export async function saveTask() {
  const titleInput = document.getElementById("taskTitleInput");
  const descInput = document.getElementById("taskDescriptionInput");
  const storyPoint = calculateStoryPoint();

  if (!titleInput.value.trim()) return;

  if (activeIndex === null) {
    // NEW task — POST to API to get the real DB id back
    try {
      const newTask = await createTaskInApi({
        title: titleInput.value,
        description: descInput.value,
        status: "todo",
        storyPoint,
      });
      tasks.push(newTask); // newTask has the real id from the DB
    } catch (err) {
      console.error("Failed to create task:", err);
      return;
    }
  } else {
    // EDIT existing task — update locally then PUT to API
    tasks[activeIndex].title = titleInput.value;
    tasks[activeIndex].description = descInput.value;
    tasks[activeIndex].storyPoint = storyPoint;
    await saveAllTasks();
  }

  titleInput.value = "";
  descInput.value = "";

  hideFullCard();
  renderTasks();
}

export async function deleteTask() {
  const task = tasks[activeIndex];
  if (!task) return;

  try {
    await deleteTaskInApi(task.id); // DELETE from DB first
    changeTasks(task);              // then remove from local array
  } catch (err) {
    console.error("Failed to delete task:", err);
    return;
  }

  hideFullCard();
  renderTasks();
}