import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ marginBottom: "4rem" }}>
      <div className="nav-wrapper light-blue darken-2">
        <Link
          to="/"
          className="brand-logo left"
          style={{ marginLeft: "100px" }}
        >
          lrnr
        </Link>
        <ul id="nav-mobile" className="right" style={{ marginRight: "2rem" }}>
        <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/quiz-gen">Quiz Generation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
