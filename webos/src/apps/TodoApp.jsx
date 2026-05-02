import { useEffect, useState } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nexos-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("nexos-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-app">
      <h3>To-Do List</h3>

      <div className="todo-input">
        <input
          placeholder="Add task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "done" : ""}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}