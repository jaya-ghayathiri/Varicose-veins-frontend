import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FileText,
  Video,
  Shield,
  HeartPulse,
  Activity,
  BookOpen,
  User,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          <User size={26} />
        </div>
        <div>
          <h3 className="profile-name">Reena Paarthiban</h3>
          <p className="profile-role">Patient</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavLink to="/home" className="sidebar-link">
          <Home size={18} className="icon" /> Home
        </NavLink>
        <NavLink to="/report" className="sidebar-link">
          <FileText size={18} className="icon" /> Report
        </NavLink>
        <NavLink to="/tele" className="sidebar-link">
          <Video size={18} className="icon" /> Teleconsultation
        </NavLink>
        <NavLink to="/precautions" className="sidebar-link">
          <Shield size={18} className="icon" /> Precautions
        </NavLink>
        <NavLink to="/conditions" className="sidebar-link">
          <HeartPulse size={18} className="icon" /> Conditions
        </NavLink>
        <NavLink to="/treatment" className="sidebar-link">
          <Activity size={18} className="icon" /> Treatment
        </NavLink>
        <NavLink to="/awareness" className="sidebar-link">
          <BookOpen size={18} className="icon" /> Awareness Module
        </NavLink>
      </nav>

      {/* Logout Button */}
      <NavLink to="/">
        <button className="sidebar-logout">
          <LogOut size={18} className="icon" /> Logout
        </button>
      </NavLink>
    </div>
  );
};

export default Sidebar;
