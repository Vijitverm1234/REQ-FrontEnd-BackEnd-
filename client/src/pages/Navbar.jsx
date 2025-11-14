import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./pages.css";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">ReqApp</div>

      <div className="navbar-items">

        {user ? (
          <>
            <span className="navbar-user">
              {user.name} • {user.role}
            </span>

            <button className="navbar-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-button">Login</Link>
        )}
      </div>
    </nav>
  );
}
