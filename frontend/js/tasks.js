import { tasks, activeIndex, changeTasks } from "./data.js";
import { saveAllTasks } from "./storage.js";
import { hideFullCard } from "./fullCard.js";
import { renderTasks } from "./ui.js";
import { calculateStoryPoint } from "./storyPoint.js";

export function saveTask() {
  const titleInput = document.getElementById("taskTitleInput");
  const descInput = document.getElementById("taskDescriptionInput");
  const storyPoint = calculateStoryPoint();

  if (!titleInput.value.trim()) return;

  if (activeIndex === null) {
    tasks.push({
      id: tasks.length + 1,
      title: titleInput.value,
      description: descInput.value,
      status: "todo",
      storyPoint,
    });
  } else {
    tasks[activeIndex].title = titleInput.value;
    tasks[activeIndex].description = descInput.value;
    tasks[activeIndex].storyPoint = storyPoint;
  }

  titleInput.value = "";
  descInput.value = "";

  saveAllTasks();
  hideFullCard();
  renderTasks();
}

export function deleteTask() {
  let task = tasks[activeIndex];
  changeTasks(task);
  saveAllTasks();
  hideFullCard();
  renderTasks();
}
