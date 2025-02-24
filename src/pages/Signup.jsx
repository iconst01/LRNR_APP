import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { User } from "../utils";
import { UserContext } from "../context/UserProvider";

const Signup = () => {
  // User global context
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Hooks for manipulate the inputs
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const createAccount = (event) => {
    event.preventDefault();

    // Create a new user
    const newUser = new User(
      nameInput,
      lastNameInput,
      usernameInput,
      passwordInput
    );

    // Save user in the array users at localStorage
    const usersStorage = JSON.parse(localStorage.getItem("users")) || [];
    usersStorage.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersStorage));

    // Save the user in localStorage as a current user that is login
    localStorage.setItem("user", JSON.stringify(newUser));
    // Save the user in the global context
    setUser(newUser);

    // Send the user to the account page
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
      <form onSubmit={(event) => createAccount(event)} className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input
              onInput={(event) => setNameInput(event.target.value)}
              id="first_name"
              type="text"
              className="validate"
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input
              onInput={(event) => setLastNameInput(event.target.value)}
              id="last_name"
              type="text"
              className="validate"
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="row">

            <input type="submit" value="Create Account" className="waves-effect waves-light teal darken-1 btn"/>
          </div>
          
          <div>

            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
