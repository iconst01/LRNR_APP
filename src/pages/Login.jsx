import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { User } from "../utils";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  // User global context
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = (event) => {
    event.preventDefault();

    // Bring the users saved in localStorage ( This is like our database where we have all the users )
    const usersStorage = JSON.parse(localStorage.getItem("users")) || [];

    // Search for the user with the exact same username and password
    const getUser = usersStorage.find(
      (user) =>
        user.username === usernameInput && user.password === passwordInput
    );

    // Validation to check if we found an user
    if (!getUser) {
      setErrorMessage("User not found");
      setUsernameInput("");
      setPasswordInput("");
      return;
    } else {
      setErrorMessage("");
    }

    // Updating the global user context with the user
    const userLogged = new User(
      getUser.name,
      getUser.lastName,
      getUser.username,
      getUser.password
    );

    // Save the user in localStorage as a current user that is login
    localStorage.setItem("user", JSON.stringify(userLogged));
    // Save the user in the global context
    setUser(userLogged);

    navigate("/account");
  };

  // If the user is login, send the user to the account page
  useEffect(() => {
    const isUserLogin = () => {
      if (user?.name) {
        navigate("/account");
        return;
      }
    };

    isUserLogin();
  }, []);

  return (
    <div className="row">
      <form onSubmit={(event) => loginUser(event)} className="col s12">
        <div className="row container">
          <div className="input-field col s12">
            <input
              onInput={(event) => setUsernameInput(event.target.value)}
              id="username"
              type="text"
              className="validate"
              required
              style={{ width: "380px",  }}
            />
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              onInput={(event) => setPasswordInput(event.target.value)}
              id="password"
              type="password"
              required
              className="validate"
            />
            <label htmlFor="password">Password</label>
          </div>
          <p>{errorMessage}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="row">
            <input type="submit" value="Login" className="waves-effect waves-light btn" style={{backgroundColor: "#22C2C6"}}/>
          </div>
          
          <div>

            <Link to="/signup" style={{color: "#22C2C6"}}>Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
