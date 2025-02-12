import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{ marginBottom: "4rem" }}>
            <div className="nav-wrapper light-blue darken-2">
            <a href="#" className="brand-logo left" style={{marginLeft: "2rem"}}>lrnr</a>
            <ul id="nav-mobile" class="right">
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/quiz-gen">Quiz Generation</Link></li>
            </ul>
            </div>
      </nav>
    )
}