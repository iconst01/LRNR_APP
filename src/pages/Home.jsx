import { Link } from "react-router-dom";

import logo from "../assets/app.png";
// import Footer from "../components/Footer";
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

  @media (max-width: 850px) {
    & div {
      margin: 0 auto;
      width: 80% !important;
    }
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
            style={{ width: "min(32rem, 80%)", height: "min(12em, 20vh)", borderRadius: "10px", objectFit: "cover"}}
          />
          <h5
            style={{
              whiteSpace: "nowrap",
              color: "#616161",
              fontSize: "clamp(1em, 3vw, 1.7em)",
            }}
          >
            Create your own personalized quiz with AI.
          </h5>
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              to="/quiz-gen"
              className="waves-effect btn btn-large"
              style={{ marginBottom: "18%", backgroundColor: "#22C2C6" }}
            >
              BEGIN JOURNEY
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "4rem", marginRight: "2rem" }}>
        <ResponsiveDiv
          className="row center-align"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "8rem",
          }}
        >
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#E49602",
                transform: "scale(2)",
                marginBottom: "0.5rem",
                marginTop: "1rem"
              }}
            >
              flash_on
            </span>
            <h5>Personalized Quizzes</h5>
            <p className="left-align">
            Greetings, eager learner! Are you ready to embark on a journey of personalized growth and discovery? Our app creates custom quizzes tailored to your knowledge level and interests. Whether you're just starting or already an expert, our system generates questions that challenge your understanding across various subjects, helping you learn and improve in a fun and engaging way.
            </p>
          </div>
          <div className="col s12 m4">
            <span
              className="material-icons"
              style={{
                color: "#E49602",
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
                color: "#E49602",
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
