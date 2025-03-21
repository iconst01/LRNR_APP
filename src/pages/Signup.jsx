// Signup.js
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { User } from "../utils";
import { UserContext } from "../context/UserProvider";
import InputValidator from "../components/InputValidator";

const Signup = () => {
  // User global context
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Form data
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  
  // Form errors
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle name input change
  const handleNameChange = (event) => {
    const value = event.target.value;
    setNameInput(value);
    const { isValid, error } = InputValidator.validateField("name", value);
    setNameError(error);
  };

  // Handle last name input change
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastNameInput(value);
    const { isValid, error } = InputValidator.validateField("lastName", value);
    setLastNameError(error);
  };

  // Handle username input change
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsernameInput(value);
    const { isValid, error } = InputValidator.validateField("username", value);
    setUsernameError(error);
  };

  // Handle password input change
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPasswordInput(value);
    const { isValid, error } = InputValidator.validateField("password", value);
    setPasswordError(error);
  };

  const createAccount = (event) => {
    event.preventDefault();

    // Create form data object for validation
    const formData = {
      name: nameInput,
      lastName: lastNameInput,
      username: usernameInput,
      password: passwordInput
    };

    // Validate all fields at once
    const { isFormValid, errors } = InputValidator.validateForm(formData);
    
    // Update error states
    setNameError(errors.name || "");
    setLastNameError(errors.lastName || "");
    setUsernameError(errors.username || "");
    setPasswordError(errors.password || "");

    // If validation fails, stop form submission
    if (!isFormValid) {
      return;
    }

    // Bring the users saved in localStorage
    const usersStorage = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    const validateUsername = usersStorage.find(
      (user) => user.username === usernameInput
    );

    if (validateUsername) {
      setErrorMessage("Username already exists");
      return;
    } else {
      setErrorMessage("");
    }

    // Create a new user
    const newUser = new User(
      nameInput,
      lastNameInput,
      usernameInput,
      passwordInput
    );

    // Save user in the array users at localStorage
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
      <form onSubmit={createAccount} className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input
              id="first_name"
              type="text"
              value={nameInput}
              onChange={handleNameChange}
              required
              className={`validate ${nameError ? "invalid" : ""}`}
            />
            <label htmlFor="first_name">First Name</label>
            {nameError && (
              <span className="helper-text" data-error={nameError}>
                {nameError}
              </span>
            )}
          </div>
          <div className="input-field col s6">
            <input
              id="last_name"
              type="text"
              value={lastNameInput}
              onChange={handleLastNameChange}
              required
              className={`validate ${lastNameError ? "invalid" : ""}`}
            />
            <label htmlFor="last_name">Last Name</label>
            {lastNameError && (
              <span className="helper-text" data-error={lastNameError}>
                {lastNameError}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username"
              type="text"
              value={usernameInput}
              onChange={handleUsernameChange}
              required
              className={`validate ${usernameError ? "invalid" : ""}`}
            />
            <label htmlFor="username">Username</label>
            {usernameError && (
              <span className="helper-text" data-error={usernameError}>
                {usernameError}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              value={passwordInput}
              onChange={handlePasswordChange}
              required
              className={`validate ${passwordError ? "invalid" : ""}`}
            />
            <label htmlFor="password">Password</label>
            {passwordError && (
              <span className="helper-text" data-error={passwordError}>
                {passwordError}
              </span>
            )}
          </div>
          {errorMessage && <p className="red-text">{errorMessage}</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="row">
            <input
              type="submit"
              value="Create Account"
              className="waves-effect waves-light teal darken-1 btn"
            />
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
