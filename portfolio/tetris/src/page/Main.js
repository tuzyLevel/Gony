import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import backgroundClasses from "../UI/Background.module.css";
import classes from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate("/board", { replace: false });
    console.log("clicked!");
  };

  return (
    <div className={backgroundClasses.background}>
      <div className={classes.container__enter_box}>
        <h1>Welcome Go's Tetris</h1>
        <Button buttonName="들어가기" addOnClick={buttonClickHandler} />
      </div>
    </div>
  );
};

export default Main;
