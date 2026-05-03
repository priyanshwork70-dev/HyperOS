import { useEffect, useState } from "react";

const STORAGE_KEY = "hyperos:todoTasks";

const starterTasks = [
  {
    id: "task-1",
    title: "Finish HyperOS UI",
    priority: "High",
    done: false,
  },
  {
    id: "task-2",
    title: "Test all apps before demo",
    priority: "Medium",
    done: false,
  },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return starterTasks;

    try {
      return JSON.parse(saved);
    } catch {
      return starterTasks;
    }
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const cleanTitle = taskTitle.trim();

    if (!cleanTitle) return;

    const newTask = {
      id: Date.now().toString(),
      title: cleanTitle,
      priority,
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle("");
    setPriority("Medium");
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const clearDoneTasks = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  const completedCount = tasks.filter((task) => task.done).length;

  return (
    <div className="todo-app">
      <div className="todo-header">
        <div>
          <h2>Tasks</h2>
          <p>
            {completedCount}/{tasks.length} completed
          </p>
        </div>

        <button onClick={clearDoneTasks}>Clear Done</button>
      </div>

      <div className="todo-create-box">
        <input
          value={taskTitle}
          placeholder="Add a new task..."
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      <div className="todo-list">
        {tasks.length === 0 ? (
          <p className="empty-tasks">No tasks yet. Add your first task.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={task.done ? "todo-item done-task" : "todo-item"}
            >
              <button
                className="todo-check"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : ""}
              </button>

              <div className="todo-info">
                <strong>{task.title}</strong>
                <span className={`priority-tag ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>

              <button
                className="todo-delete"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}