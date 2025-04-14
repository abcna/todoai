import React from "react";
import "./Contact.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";

const Contact = ({ tasks = [] }) => {
  return (
    <div className="contact">
      <h1>تقویم</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar />
      </LocalizationProvider>
      <div className="completed-tasks">
        {tasks
          .filter((task) => task.completed)
          .map((task, index) => (
            <div
              key={index}
              className="task-item"
              style={{ backgroundColor: task.color }}
            >
              <h3>{task.title}</h3>
              <p>تاریخ: {task.date}</p>
              <p>دسته‌بندی: {task.category}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Contact;
