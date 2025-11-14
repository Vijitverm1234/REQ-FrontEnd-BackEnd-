import { useEffect, useState } from "react";
import { api } from "../api/axios";
import "./pages.css";
import NavBar from "./Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const quotes = [
    "“Even the darkest nights end eventually — that’s when the stars start talking.”",
    "“Normal is overrated; be the glitch in the simulation.”",
    "“Your mind is a universe — explore it before you explore the world.”",
    "“Chaos is simply order waiting to be understood.”",
    "“Some dreams whisper, others scream — listen to both.”"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    api
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  }, []);

  return (
    <>  <NavBar></NavBar>
    <div className="dashboard-wrapper">
      
      <div className="dashboard-card">
        {user ? (
          <>
            <h2 className="dashboard-title">
              Welcome, {user.name}
            </h2>

            <div className="dashboard-role">
              {user.role === "Admin" ? "Admin" : "User"}
            </div>

            <p className="dashboard-quote">{randomQuote}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div></>
  );
}
