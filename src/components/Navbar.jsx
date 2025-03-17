
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import M from "materialize-css"; 

import { useContext } from "react"
import { UserContext } from "../context/UserProvider";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, { edge: "right" }); // Open sidebar from the right
  }, []);

    // Function to decide the path dynamically
    const stayOnCurrentPage = (e) => {
      e.preventDefault(); // Prevent the default behavior of Link
      const path = location.pathname === "/quiz-gen" ? "/quiz-gen" : "/quiz-gen"; // Customize the logic as needed
      navigate(path, { replace: true });
    };
  

  return (
    <>
      <nav style={{ marginBottom: "4rem" }}>
        <div className="nav-wrapper light-blue darken-2">

          <Link to="/" className="brand-logo left" style={{ marginLeft: "100px" }}>
            lrnr
          </Link>

          {/* on desktop the hamburger is hidden */}
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ marginRight: "2rem" }}>
           
            {/* hides login if you are logged in */}
           {!user?.name && <li><Link to="/login">Login</Link></li>} 

            {/* hides account if you are not logged in */}
            {user?.name && <li><Link to="/account">Account</Link></li>}
            
            <li><Link to="/quiz-gen">Quiz Generation</Link></li>
          </ul>

          {/* hamburger menu on right side */}
          <Link to={{stayOnCurrentPage}} data-target="mobile-demo" className="sidenav-trigger right" style={{ marginRight: "1rem" }}>
            <i className="material-icons">menu</i>
          </Link>
        </div>
      </nav>

      {/* modal that slides in from the right side */}
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>

        {!user?.name && <li><Link to="/login">Login</Link></li>}

        {user?.name && <li><Link to="/account">Account</Link></li>}
        <li><Link to="/quiz-gen">Quiz Generation</Link></li>
      </ul>
    </>
  );
}
