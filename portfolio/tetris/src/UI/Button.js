import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.enter_button} onClick={props.addOnClick}>
      {props.buttonName}
    </button>
  );
};

export default Button;
