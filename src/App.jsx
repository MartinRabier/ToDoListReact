import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [datetime, setDatetime] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      done: false,
      datetime,
    };

    setTasks([...tasks, newTask]);
    setText("");
    setDatetime("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const todoTasks = tasks
    .filter(t => !t.done)
    .sort((a, b) => {
      if (!a.datetime) return 1;  // sans date → en bas
      if (!b.datetime) return -1;
      return new Date(a.datetime) - new Date(b.datetime); // plus tôt → en haut
    });
  
  const doneTasks = tasks
    .filter(t => t.done)
    .sort((a, b) => {
      if (!a.datetime) return 1;
      if (!b.datetime) return -1;
      return new Date(a.datetime) - new Date(b.datetime);
    });

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="card">
        <div className="top-bar">
          <h1>📝 Ma To-Do List</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="form">
          <input
            type="text"
            placeholder="Nouvelle tâche..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />

          <button onClick={addTask}>Ajouter 🚀</button>
        </div>

        <div className="columns">
          <div className="column">
            <h2>📌 À faire</h2>
            {todoTasks.map(task => (
              <div key={task.id} className={`task ${new Date(task.datetime) < new Date() && task.datetime ? "overdue" : ""}`}>
                <input
                  type="checkbox"
                  onChange={() => toggleTask(task.id)}
                />
                <span>
                  {task.text}
                  {task.datetime && (
                    <small>{task.datetime.replace("T", " à ")}</small>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="column">
            <h2>✅ Fait</h2>
            {doneTasks.map(task => (
              <div key={task.id} className="task done">
                <input
                  type="checkbox"
                  checked
                  onChange={() => toggleTask(task.id)}
                />
                <span>
                  {task.text}
                  {task.datetime && (
                    <small>{task.datetime.replace("T", " à ")}</small>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;