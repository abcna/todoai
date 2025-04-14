import React, { useContext } from "react";
import "./About.css";
import { TaskContext } from "../../index";

const About = () => {
  const { completedTasks } = useContext(TaskContext);

  return (
    <div className="about">
      <h1>تسک‌های انجام شده</h1>
      {completedTasks.length > 0 ? (
        completedTasks.map((task, index) => (
          <div
            key={index}
            className="task-item"
            style={{ backgroundColor: task.color }}
          >
            <h3>{task.title}</h3>
            <p>تاریخ: {task.date}</p>
            <p>دسته‌بندی: {task.category}</p>
          </div>
        ))
      ) : (
        <p>هیچ تسک انجام شده‌ای وجود ندارد.</p>
      )}
    </div>
  );
};

export default About;
