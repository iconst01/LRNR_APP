import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";



export default function Footer() {
 return (
  //moves the footer down on the account page
  useLocation().pathname === "/account" ? (<footer
  className="light-blue darken-2 quizFooter"
  style={{ marginTop: "8rem", position: "relative", bottom: "-50vh", paddingBottom: "1%" }}
>
  <div style={{marginLeft: "2rem"}}>
    <div className="row">
      <div className="col l6 s12">
        <p className="grey-text text-lighten-4">
          Embrace the power of our app and unlock the secrets of the
          universe, one quiz at a time. <br/> As I always say 'Yesterday is
          history, tomorrow is a mystery, but today is a gift. That is <br/> why
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
    <div style={{color: "white", marginLeft: "2.5rem"}}> © 2024 Copyright Text</div>
  </div>
</footer>) :

//the footer for the other pages
   <footer
     className="page-footer light-blue darken-2 quizFooter"
     style={{ marginTop: "8rem" }}
   >
     <div style={{marginLeft: "2rem"}}>
       <div className="row">
         <div className="col l6 s12">
           <p className="grey-text text-lighten-4">
             Embrace the power of our app and unlock the secrets of the
             universe, one quiz at a time. <br/> As I always say 'Yesterday is
             history, tomorrow is a mystery, but today is a gift. That is <br/> why
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


