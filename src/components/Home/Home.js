import React, { useState, useContext, useEffect } from "react";
import "./Home.css";
import { TaskContext } from "../../index";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const { setCompletedTasks } = useContext(TaskContext);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    color: "#ffffff",
    category: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("todoData");
    return savedData ? JSON.parse(savedData) : { tasks: [], categories: [] };
  });

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

  const handleAddTask = () => {
    if (newTask.title && newTask.date && newTask.category) {
      setData((prevData) => ({
        ...prevData,
        tasks: [...prevData.tasks, { ...newTask, completed: false }],
      }));
      setNewTask({ title: "", date: "", color: "#ffffff", category: "" });
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !data.categories.includes(newCategory)) {
      setData((prevData) => ({
        ...prevData,
        categories: [...prevData.categories, newCategory],
      }));
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.filter(
        (category) => category !== categoryToDelete
      ),
      tasks: prevData.tasks.filter(
        (task) => task.category !== categoryToDelete
      ),
    }));
  };

  const handleCompleteTask = (index) => {
    setData((prevData) => {
      const updatedTasks = [...prevData.tasks];
      const completedTask = updatedTasks.splice(index, 1)[0];
      completedTask.completed = true;
      setCompletedTasks((prevCompletedTasks) => {
        if (
          !prevCompletedTasks.some(
            (task) =>
              task.title === completedTask.title &&
              task.date === completedTask.date
          )
        ) {
          return [...prevCompletedTasks, completedTask];
        }
        return prevCompletedTasks;
      });
      return {
        ...prevData,
        tasks: updatedTasks,
      };
    });
  };

  return (
    <div className="todos">
      <h1>تودوها</h1>

      <Button
        variant="outline-primary"
        className="mb-3 open-modal-button"
        onClick={() => setIsModalOpen(true)}
      >
        مدیریت دسته‌بندی‌ها
      </Button>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} autoFocus>
        <Modal.Header closeButton>
          <Modal.Title>مدیریت دسته‌بندی‌ها</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="نام دسته‌بندی جدید"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={handleAddCategory}
            className="mb-3"
          >
            اضافه کردن دسته‌بندی
          </Button>
          <ul className="list-group">
            {data.categories.map((category, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {category}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCategory(category)}
                >
                  ✖
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>

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
          {data.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddTask} className="add-task-button">
          اضافه کردن تسک
        </button>
      </div>

      <div className="task-list">
        {data.tasks.map(
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
                <button
                  onClick={() => handleCompleteTask(index)}
                  className="complete-task-button"
                >
                  تیک زدن
                </button>
              </div>
            )
        )}
      </div>

      <h2>تسک‌های انجام شده</h2>
      <div className="completed-tasks">
        {data.tasks.map(
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
