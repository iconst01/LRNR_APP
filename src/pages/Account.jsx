import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

import UserInfoCard from "../components/UserInfoCard";
import UserLevelCard from "../components/UserLevelCard";
import AccountDashboard from "../components/AccountDashboard";

import { updateXP } from "../utils/badgeSystem"

import "../styles/Account.css";
import styled from "styled-components";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";


const ResponsiveDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 600px) {
    position: relative;
    right: 2.5%;
    flex-direction: column;
  }
`;

const Account = () => {
  const navigate = useNavigate();

  // User global context
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

  // Check if the user is login
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  //everytime the User object's properties are changed update it in local storage for persistance
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])

  //changes the User object
  function handleXp(xpTopic) {
    const updatedUser = { ...user }; 
    updateXP(updatedUser, 10, xpTopic);
    setUser(updatedUser);  // inside the context set the user to itself but with a new amount of xp
  }


  return (
    <div>
      <div className="section teal-text text-darken-5">
        <h1 className="titleAcc" onClick={() => handleXp('golang')} style={{ cursor: "pointer" }}>Account</h1>
        <h1 onClick={() => handleXp('js')}>Test</h1>
        <UserLevelCard/>
        <UserInfoCard/>
      </div>
      {/* <div className="container section">
        <ResponsiveDiv
          className="row center-align"
          style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
        >
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#1de9b6",
                transform: "scale(2)",
                marginBottom: "2rem",
              }}
            >
              whatshot
            </span>
            <h5>Streak</h5>
            <p className="left-align containerTxt">
              You have a streak of 5 days!
            </p>
          </div>
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#1de9b6",
                transform: "scale(2)",
                marginBottom: "2rem",
              }}
            >
              view_list
            </span>
            <h5>Platinum Quizzes</h5>
            <ul className="left-align containerTxt">
              <li>golang - intermediate</li>
              <li>JavaScript - beginner</li>
              <li>AWS - beginner</li>
            </ul>
          </div>
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#1de9b6",
                transform: "scale(2)",
                marginBottom: "2rem",
              }}
            >
              person
            </span>
            <h5>lrnr Level: 2</h5>
            <p className="center-align containerTxt">150/200 xp</p>
          </div>
        </ResponsiveDiv>
        <div>
          <button onClick={handleLogout}>logout</button>
        </div>
      </div> */}
      <AccountDashboard/>    
      <button onClick={handleLogout}>logout</button>

    </div>
    
  );
};

export default Account;
