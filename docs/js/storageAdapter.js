import * as localAPI from "./localStorageApi.js";
import * as databaseAPI from "./json.js";

// Check what mode we're in (default to local storage)
let useLocalStorage = localStorage.getItem("useLocalStorage") !== "false";

export function isUsingLocalStorage() {
  return useLocalStorage;
}

export function toggleStorageMode() {
  useLocalStorage = !useLocalStorage;
  localStorage.setItem("useLocalStorage", useLocalStorage);
  window.location.reload(); // reload to reinitialize with new storage
}

// Export the appropriate API based on current mode
export const createTaskInApi = (...args) =>
  useLocalStorage
    ? localAPI.createTaskInApi(...args)
    : databaseAPI.createTaskInApi(...args);

export const updateTaskInApi = (...args) =>
  useLocalStorage
    ? localAPI.updateTaskInApi(...args)
    : databaseAPI.updateTaskInApi(...args);

export const deleteTaskInApi = (...args) =>
  useLocalStorage
    ? localAPI.deleteTaskInApi(...args)
    : databaseAPI.deleteTaskInApi(...args);

export const getFromApi = (...args) =>
  useLocalStorage
    ? localAPI.getFromApi(...args)
    : databaseAPI.getFromApi(...args);
