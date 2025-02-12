import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="page-footer light-blue darken-2"
      style={{ marginTop: "8rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <p className="grey-text text-lighten-4">
              Embrace the power of our app and unlock the secrets of the
              universe, one quiz at a time. As I always say 'Yesterday is
              history, tomorrow is a mystery, but today is a gift. That's why
              it's called the present.'
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><Link className="grey-text text-lighten-3" to="/">Home</Link> </li>
              <li><Link className="grey-text text-lighten-3" to="/quiz-gen">Quiz Generator</Link></li>
              <li><Link className="grey-text text-lighten-3" to="/account">Account</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container"> © 2024 Copyright Text</div>
      </div>
    </footer>
  );
}
