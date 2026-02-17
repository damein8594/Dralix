export const newTaskBtn = document.querySelector("#newTaskBtn");
export const deleteBtn = document.getElementById("deleteBtn");
export const closeFullCardBtn = document.getElementById("closeFullCard");
export const cancelTaskBtn = document.getElementById("cancelTaskBtn");
export const saveTaskBtn = document.getElementById("saveTaskBtn");
export const toggleBtn = document.getElementById("toggleTheme");

export const lists = {
  todo: document.querySelector("#todoList"),
  doing: document.querySelector("#doingList"),
  done: document.querySelector("#doneList"),
};

export let activeIndex = null;
export function setActiveIndex(value) {
  activeIndex = value;
}

export let tasks = [
  // //JSON.parse(localStorage.getItem("tasks")) || [
  // {
  //   // id: 1,
  //   title: "Learn JavaScript",
  //   status: "todo",
  //   description: "Work through core JavaScript concepts.",
  //   storyPoint: 5,
  // },
  // {
  //   // id: 2,
  //   title: "Review CSS Flexbox",
  //   status: "todo",
  //   description: "Revisit Flexbox fundamentals.",
  //   storyPoint: 3,
  // },
  // {
  //   // id: 3,
  //   title: "Plan project features",
  //   status: "todo",
  //   description: "Outline features and requirements.",
  //   storyPoint: 2,
  // },
  // {
  //   // id: 4,
  //   title: "Build the board",
  //   status: "doing",
  //   description: "Create board structure and logic.",
  //   storyPoint: 8,
  // },
  // {
  //   // id: 5,
  //   title: "Style task cards",
  //   status: "doing",
  //   description: "Apply spacing and hover effects.",
  //   storyPoint: 3,
  // },
  // {
  //   // id: 6,
  //   title: "Finish lesson",
  //   status: "done",
  //   description: "Complete the lesson.",
  //   storyPoint: 2,
  // },
  // {
  //   // id: 7,
  //   title: "Watch JS tutorial",
  //   status: "done",
  //   description: "Watch and take notes.",
  //   storyPoint: 1,
  // },
  // {
  //   // id: 8,
  //   title: "Set up project repo",
  //   status: "done",
  //   description: "Initialize repository.",
  //   storyPoint: 1,
  // },
];

// import { getFromApi, saveToApi } from "./json.js";
// saveToApi(tasks);
// export let tasks = [];

export async function initializeTasks() {
  tasks = await getFromApi();
}

// const todoOrder = tasks.filter((t) => t.status === "todo");
// console.log(todoOrder);

// const doingOrder = tasks.filter((t) => t.status === "doing");
// console.log(doingOrder);

// const doneOrder = tasks.filter((t) => t.status === "done");
// console.log(doneOrder);
