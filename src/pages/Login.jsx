import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { User } from "../utils";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  // User context
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

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
      console.log("no user");
      return;
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
      if (user) {
        navigate("/account");
        return;
      }
    };

    isUserLogin();
  }, []);

  return (
    <div className="row">
      <form onSubmit={(event) => loginUser(event)} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              onInput={(event) => setUsernameInput(event.target.value)}
              id="username"
              type="text"
              className="validate"
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
              className="validate"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Login" />
        </div>
        <div className="row">
          <Link to="/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
