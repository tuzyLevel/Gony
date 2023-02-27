import React from "react";
import classes from "./CustomButton.module.css";

const CustomButton: React.FC<{
  cssClasses: string[];
  name: string;
  onPush: () => void;
}> = (props) => {
  return (
    <button
      className={props.cssClasses.map((cls) => classes[cls]).join(" ")}
      onClick={props.onPush}
    >
      {props.name}
    </button>
  );
};

export default CustomButton;
