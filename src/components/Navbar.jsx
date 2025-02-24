import { Link } from "react-router-dom";
import { useEffect } from "react";
import M from "materialize-css"; 

export default function Navbar() {
  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { edge: "right" }); // Open sidebar from the right
  }, []);

  return (
    <>
      <nav style={{ marginBottom: "4rem" }}>
        <div className="nav-wrapper light-blue darken-2">

          <Link to="/" className="brand-logo left" style={{ marginLeft: "100px" }}>
            lrnr
          </Link>

          {/* on desktop the hamburger is hidden */}
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ marginRight: "2rem" }}>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><Link to="/quiz-gen">Quiz Generation</Link></li>
          </ul>

          {/* hamburger menu on right side */}
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger right" style={{ marginRight: "1rem" }}>
            <i className="material-icons">menu</i>
          </Link>
        </div>
      </nav>

      {/* modal that slides in from the right side */}
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/quiz-gen">Quiz Generation</Link></li>
      </ul>
    </>
  );
}
