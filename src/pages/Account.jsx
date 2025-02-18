import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import styled from "styled-components";

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
  return (
    <div className="">
      <div>
        <h1>Account</h1>
      </div>
      <div className="container">
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
                marginBottom: "1rem",
              }}
            >
              flash_on
            </span>
            <h5>Streak</h5>
            <p className="center-align">Greetings, young padawan</p>
          </div>
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#1de9b6",
                transform: "scale(2)",
                marginBottom: "1rem",
              }}
            >
              payments
            </span>
            <h5>Platinum Quizzes</h5>
            <p className="center-align">Our app</p>
          </div>
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#1de9b6",
                transform: "scale(2)",
                marginBottom: "1rem",
              }}
            >
              person
            </span>
            <h5>lrnr Level: 2</h5>
            <p className="center-align">Welcome to</p>
          </div>
        </ResponsiveDiv>
      </div>
    </div>
  );
};

export default Account;
