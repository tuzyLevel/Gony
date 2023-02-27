import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes["navbar-title"]}>
        <Link to="/">
          <h1>Tetris</h1>
        </Link>
      </div>

      <ul>
        <Link to="/Login">
          <li className={classes["navbar-li"]}>Login</li>
        </Link>
        <Link to="/SignIn">
          <li className={classes["navbar-li"]}>Sign In</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
