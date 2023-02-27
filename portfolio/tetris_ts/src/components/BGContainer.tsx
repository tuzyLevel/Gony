import React from "react";
import NavBar from "./NavBar";
import classes from "./BGContainer.module.css";

const BGContainer: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={classes.container}>
      <NavBar />
      {props.children}
    </div>
  );
};

export default BGContainer;
