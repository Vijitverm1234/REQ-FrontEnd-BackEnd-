import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending:", form);

      const res = await api.post("/auth/login", form);

      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br /><br />

        <button type="submit">Login</button>
        <button onClick={() => navigate('/signup')}>Not registered?</button>
      </form>
    </div>
  );
}
