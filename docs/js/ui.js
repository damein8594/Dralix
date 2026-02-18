import { lists, tasks } from "./data.js";
import { saveAllTasks } from "./storage.js";
import { showFullCard } from "./fullCard.js";

export function switchTheme() {
  document.body.classList.toggle("dark");
}

function createButtons(task, index) {
  const expandBtn = document.createElement("button");
  expandBtn.textContent = "⤢";
  expandBtn.className = "expandBtn";
  expandBtn.onclick = () => showFullCard(task, index);

  const backBtn = document.createElement("button");
  backBtn.textContent = "←";
  backBtn.className = "backBtn";
  backBtn.onclick = () => {
    task.status = task.status === "done" ? "doing" : "todo";
    saveAllTasks();
    renderTasks();
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "→";
  nextBtn.className = "nextBtn";
  nextBtn.onclick = () => {
    task.status = task.status === "todo" ? "doing" : "done";
    saveAllTasks();
    renderTasks();
  };

  return { backBtn, expandBtn, nextBtn };
}

function createDropZone(list, dropIndex) {
  const dropZone = document.createElement("div");
  dropZone.className = "dropzone";
  dropZone.dataset.dropIndex = dropIndex;

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("active");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("active");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("active");

    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    const draggedTask = tasks[draggedIndex];
    const newStatus = list.dataset.status;
    const dropPosition = Number(dropZone.dataset.dropIndex);

    // Remove the dragged task from the main array first
    tasks.splice(draggedIndex, 1);
    draggedTask.status = newStatus;

    // NOW get all tasks in the target column (after removal)
    const targetColumnTasks = tasks.filter((t) => t.status === newStatus);

    // Calculate the actual global index to insert at
    let globalInsertIndex;

    if (targetColumnTasks.length === 0) {
      // Empty column - just push to end
      globalInsertIndex = tasks.length;
    } else if (dropPosition === 0) {
      // Insert at the very beginning of this column
      globalInsertIndex = tasks.indexOf(targetColumnTasks[0]);
    } else if (dropPosition >= targetColumnTasks.length) {
      // Insert at the very end of this column
      const lastTask = targetColumnTasks[targetColumnTasks.length - 1];
      globalInsertIndex = tasks.indexOf(lastTask) + 1;
    } else {
      // Insert before the task at dropPosition
      globalInsertIndex = tasks.indexOf(targetColumnTasks[dropPosition]);
    }

    // Insert the task at the calculated position
    tasks.splice(globalInsertIndex, 0, draggedTask);

    saveAllTasks();
    renderTasks();
  });

  return dropZone;
}

export function renderTasks() {
  Object.values(lists).forEach((list) => (list.innerHTML = ""));

  Object.entries(lists).forEach(([status, list]) => {
    const statusTasks = tasks.filter((t) => t.status === status);

    statusTasks.forEach((task, i) => {
      list.appendChild(createDropZone(list, i));

      const card = document.createElement("div");
      card.className = task.status;
      card.draggable = true;

      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", tasks.indexOf(task));
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });

      const header = document.createElement("div");
      header.className = "card-header-row";

      const storyPointBadge = document.createElement("span");
      storyPointBadge.className = "story-point-badge";
      storyPointBadge.textContent = task.storyPoint;

      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = task.title;

      const { backBtn, expandBtn, nextBtn } = createButtons(
        task,
        tasks.indexOf(task),
      );

      header.append(storyPointBadge, title, expandBtn);

      const btnHolder = document.createElement("div");
      btnHolder.className = "btn-Holder";

      if (task.status !== "todo") btnHolder.appendChild(backBtn);
      if (task.status !== "done") btnHolder.appendChild(nextBtn);

      card.append(header, btnHolder);
      list.appendChild(card);
    });

    list.appendChild(createDropZone(list, statusTasks.length));
  });
}
