import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./pages.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="signup-input"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="signup-input"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="signup-select"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>User</option>
            <option>Admin</option>
          </select>

          <button className="signup-btn">Sign Up</button>

          <button
            type="button"
            className="signup-secondary"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
}
