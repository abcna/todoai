import React from "react";
import { NavLink } from "react-router-dom";
import "./MobileMenu.css";
import TodayIcon from "@mui/icons-material/Today";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MobileMenu = () => {
  return (
    <div className="mobile-menu">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <TodayIcon />
        <span>تودوها</span>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <CategoryIcon />
        <span>دسته‌بندی</span>
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <CalendarMonthIcon />
        <span>تقویم</span>
      </NavLink>
    </div>
  );
};

export default MobileMenu;
