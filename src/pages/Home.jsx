import logo from "../assets/logo.png";
import Footer from "../components/Footer";
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

export default function Home() {
  return (
    <>
      <div className="container main">
        <div className="container center-align">
          <img
            src={logo}
            alt=""
            style={{ width: "min(32rem, 80%)", height: "min(12em, 20vh)" }}
          />
          <h5
            style={{
              whiteSpace: "nowrap",
              color: "#616161",
              fontSize: "clamp(1em, 3vw, 1.7em)",
            }}
          >
            Your guided path to programming enlightnment
          </h5>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              class="waves-effect waves-light btn btn-large"
              style={{ marginBottom: "18%" }}
            >
              BEGIN JOURNEY
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "4rem", marginRight: "2rem" }}>
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
            <h5>Personalized Quizzes</h5>
            <p className="left-align">
              Greetings, young padawan. Are you ready to embark on a journey of
              personalized enlightenment through the art of coding? Our app can
              create custom quizzes that align with your coding skills and
              interests. Whether you are a novice or a master, our system can
              generate questions that will test your proficiency in programming
              languages, tools, and concepts.
            </p>
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
            <h5>Rewarding</h5>
            <p className="left-align">
              Our app is designed to be both challenging and rewarding, so you
              can learn new concepts while enjoying the process. With our
              personalized quiz app, you can track your progress, compete with
              your peers, and discover new areas of expertise. The journey of a
              thousand lines of code begins with a single keystroke
            </p>
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
            <h5>Personal SME</h5>
            <p className="left-align">
              Welcome to the path of knowledge. Our app is like having a
              personal subject matter expert at your side, guiding you on your
              journey towards wisdom
            </p>
          </div>
        </ResponsiveDiv>
      </div>
    </>
  );
}
