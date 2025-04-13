import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    color: "#ffffff",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddTask = () => {
    if (newTask.title && newTask.date && newTask.category) {
      setTasks([...tasks, { ...newTask, completed: false }]);
      setNewTask({ title: "", date: "", color: "#ffffff", category: "" });
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  return (
    <div className="todos">
      <h1>تودوها</h1>
      <div className="category-input">
        <input
          type="text"
          placeholder="نام دسته‌بندی جدید"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>اضافه کردن دسته‌بندی</button>
      </div>

      <div className="task-inputs">
        <input
          type="text"
          placeholder="عنوان تسک"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="color"
          value={newTask.color}
          onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
        />
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddTask}>اضافه کردن تسک</button>
      </div>

      <div className="task-list">
        {tasks.map(
          (task, index) =>
            !task.completed && (
              <div
                key={index}
                className="task-item"
                style={{ backgroundColor: task.color }}
              >
                <h3>{task.title}</h3>
                <p>تاریخ: {task.date}</p>
                <p>دسته‌بندی: {task.category}</p>
                <button onClick={() => handleCompleteTask(index)}>
                  تیک زدن
                </button>
              </div>
            )
        )}
      </div>

      <h2>تسک‌های انجام شده</h2>
      <div className="completed-tasks">
        {tasks.map(
          (task, index) =>
            task.completed && (
              <div
                key={index}
                className="task-item completed"
                style={{ backgroundColor: task.color }}
              >
                <h3>{task.title}</h3>
                <p>تاریخ: {task.date}</p>
                <p>دسته‌بندی: {task.category}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Home;
