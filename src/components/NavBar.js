// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#1976D2",
      color: "white",
      padding: "1rem"
    }}>
      <div>
        <Link to="/" style={{color: "white", marginRight: "2rem"}}>Home</Link>
        <Link to="/booking" style={{color: "white", marginRight: "2rem"}}>Booking (Chatbot)</Link>
      </div>
      <div>
        <Link to="/doctor-login" style={{color: "white", marginRight: "2rem"}}>Login Doctor</Link>
        <Link to="/admin-register" style={{color: "white"}}>Register Admin</Link>
      </div>
    </nav>
  );
}
