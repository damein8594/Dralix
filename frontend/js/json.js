export function saveToApi(tasks) {
  tasks.forEach((task) => {
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        status: task.status,
        description: task.description,
        storyPoint: task.storypoint || task.storyPoint,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Saved task:", data))
      .catch((err) => console.error("Error:", err));
  });
}

export async function getFromApi() {
  const res = await fetch("http://localhost:5000/api/tasks");
  const data = await res.json();
  return data;
}
