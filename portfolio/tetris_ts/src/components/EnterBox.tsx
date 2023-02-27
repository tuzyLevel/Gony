import React from "react";

import classes from "./EnterBox.module.css";

const EnterBox: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={classes["enter-box"]}>{props.children}</div>;
};

export default EnterBox;
