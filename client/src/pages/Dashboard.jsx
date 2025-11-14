import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => setUser(res.data));
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Dashboard</h2>
      {user ? (
        <h3>Welcome, {user.name} ({user.role})</h3>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
