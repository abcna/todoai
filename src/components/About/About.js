import React from "react";
import "./About.css";

const About = ({ tasks = [] }) => {
  const categories = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  return (
    <div className="about">
      <h1>دسته‌بندی‌ها</h1>
      {Object.keys(categories).map((category, index) => (
        <div key={index} className="category-section">
          <h2>{category || "بدون دسته‌بندی"}</h2>
          {categories[category].map((task, taskIndex) => (
            <div
              key={taskIndex}
              className="task-item"
              style={{ backgroundColor: task.color }}
            >
              <h3>{task.title}</h3>
              <p>تاریخ: {task.date}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default About;
