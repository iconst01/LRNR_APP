
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import M from "materialize-css"; 
import logo from "../assets/logoA.svg"

import { useContext } from "react"
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
      <nav style={{ marginBottom: "4rem", backgroundColor: "#103C59" }}>
        <div className="nav-wrapper ">

          <Link to="/" className="brand-logo left" style={{ marginLeft: "10px", marginTop: "5px"}}>
            <img src={logo} alt="logo" style={{width: "6rem"}} />
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
