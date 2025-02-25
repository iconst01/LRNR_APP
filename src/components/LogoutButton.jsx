import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

export default function LogoutButton() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

      // Function to logout the user
      const handleLogout = () => {
        // Delete the user from the localStorage ( This simulate the user being logged in )
        localStorage.removeItem("user");
    
        // Remove the user from the global context
        setUser(null);
    
        // Send the user to the home page
        navigate("/");
      };
    
    return (
        <div className="statsWrapper" onClick={handleLogout}>
            <button>Logout</button> 
        </div>
    )
}