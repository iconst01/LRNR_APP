import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import M from "materialize-css"; 
import { UserContext } from "../context/UserProvider";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const isLoggedIn = Boolean(user?.name); // make login check a boolean

  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { edge: "right" }); // Open sidebar from the right
  }, []);

  // Function to stay on the same page
  const stayOnCurrentPage = (e) => {
    e.preventDefault();
    navigate(location.pathname, { replace: true });
  };

  return (
    <>
      <nav style={{ marginBottom: "4rem" }}>
        <div className="nav-wrapper light-blue darken-2">
          <Link to="/" className="brand-logo left" style={{ marginLeft: "100px" }}>
            lrnr
          </Link>

          {/* Desktop Menu */}
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ marginRight: "2rem" }}>
            {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
            {isLoggedIn && <li><Link to="/account">Account</Link></li>}
            <li><Link to="/quiz-gen">Quiz Generation</Link></li>
          </ul>

          {/* Hamburger Menu Trigger */}
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right" style={{ marginRight: "1rem" }} onClick={stayOnCurrentPage}>
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {isLoggedIn && <li><Link to="/account">Account</Link></li>}
        <li><Link to="/quiz-gen">Quiz Generation</Link></li>
      </ul>
    </>
  );
}
