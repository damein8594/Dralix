import { setActiveIndex } from "./data.js";

export function showFullCard(task, index) {
  const fullCard = document.getElementById("fullCard");
  const title = document.getElementById("fullCardTitle");
  const storyPoint = document.getElementById("fullCardStoryPoint");
  const id = document.getElementById("fullCardId");
  const desc = document.getElementById("fullCardDescription");

  setActiveIndex(index);

  if (!task) {
    fullCard.className = "full-Card edit-mode";
    fullCard.style.display = "flex";
    return;
  }

  fullCard.className = `full-Card view-mode ${task.status}`;
  title.textContent = task.title;
  storyPoint.textContent = `Story Point: ${task.storyPoint}`;
  id.textContent = `#${task.id}`;
  desc.textContent = task.description || "No description";

  fullCard.style.display = "flex";
}

export function hideFullCard() {
  const fullCard = document.getElementById("fullCard");
  fullCard.style.display = "none";
  fullCard.className = "full-Card";
}
