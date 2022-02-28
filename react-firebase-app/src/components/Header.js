import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css"; 
import Hero from "./Hero";


const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");

  const history = useHistory();
  // const Hero=handleLogout();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddEvent");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <div className="header">
      <p className="logo">Event Tracker</p>
      <div className="header-right">
        <form onSubmit={handleSubmit} style={{ display: "inline" }}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Name ..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddEvent" ? "active" : ""}`}
            onClick={() => setActiveTab("AddEvent")}
          >
            Add Event
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
        <Hero/>
        {/* <Link to="/login">
        <p ClassName ="hero" onClick={handleLogout}>
           Logout</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
