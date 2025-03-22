import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useLocation, Link } from "react-router-dom";

export default function Footer() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isAccountPage = location.pathname === "/account";

  return (
    <footer
      className={`${
        isAccountPage ? "" : "page-footer"
      } light-blue darken-2 quizFooter`}
      style={{
        marginTop: "8rem",
        ...(isAccountPage && {
          position: "relative",
          bottom: "-50vh",
          paddingBottom: "1%",
        }),
      }}
    >
      <div style={{ marginLeft: "2rem" }}>
        <div className="row">
          <div className="col l6 s12">
            <p className="grey-text text-lighten-4">
              Embrace the power of our app and unlock the secrets of the
              universe, one quiz at a time. <br /> As I always say 'Yesterday is
              history, tomorrow is a mystery, but today is a gift. That is{" "}
              <br /> why it's called the present.
            </p>
            <div className="footer-copyrigh">
              <div
                style={
                  isAccountPage
                    ? { color: "white", marginLeft: "2.5rem" }
                    : { className: "container" }
                }
              >
                © 2025 LRNR
              </div>
            </div>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li>
                <Link className="grey-text text-lighten-3" to="/">
                  Home
                </Link>{" "}
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="/quiz-gen">
                  Quiz Generator
                </Link>
              </li>
              {user ? (
                <li>
                  <Link className="grey-text text-lighten-3" to="/account">
                    Account
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="grey-text text-lighten-3" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
