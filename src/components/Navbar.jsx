import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import M from "materialize-css";
import { UserContext } from "../context/UserProvider"; 

export default function Navbar() {
  const { user } = useContext(UserContext); 

  useEffect(() => {
    // Initialize Materialize sidenav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { edge: "right" });
  }, []);

  return (
    <>
      <nav style={{ marginBottom: "4rem" }}>
        <div className="nav-wrapper light-blue darken-2">
          <Link to="/" className="brand-logo left" style={{ marginLeft: "100px" }}>
            lrnr
          </Link>

          {/* Desktop Menu */}
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ marginRight: "2rem" }}>
            {!user?.name ? (
              <li><Link to="/login">Login</Link></li>
            ) : (
              <li><Link to="/account">Account</Link></li>
            )}
            <li><Link to="/quiz-gen">Quiz Generation</Link></li>
          </ul>

          {/* Hamburger Menu Trigger */}
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right" style={{ marginRight: "1rem" }}>
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        {!user?.name ? (
          <li><Link to="/login">Login</Link></li>
        ) : (
          <li><Link to="/account">Account</Link></li>
        )}
        <li><Link to="/quiz-gen">Quiz Generation</Link></li>
      </ul>
    </>
  );
}
