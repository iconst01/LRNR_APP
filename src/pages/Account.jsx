import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

import UserInfoCard from "../components/UserInfoCard";
import UserLevelCard from "../components/UserLevelCard";
import AccountDashboard from "../components/AccountDashboard";

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
  const { user } = useContext(UserContext);

  // Check if the user is login
  useEffect(() => {
    if (user?.name) {
      return;
    }
    navigate("/login");
  }, []);

  if (!user) {
    return;
  }

  return (
    <div>
      <div className="section teal-text text-darken-5">
        <h1 className="titleAcc" style={{ cursor: "pointer", color: "#22C2C6" }}
        >
          Account
        </h1>
        <UserLevelCard />
        <UserInfoCard />
      </div>
      <AccountDashboard />
    </div>
  );
};

export default Account;
