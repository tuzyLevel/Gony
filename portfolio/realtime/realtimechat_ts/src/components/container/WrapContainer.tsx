import React from "react";
import classes from "./WrapContainer.module.css";

interface WrapContainerProps extends React.PropsWithChildren {}

const WrapContainer: React.FC<WrapContainerProps> = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default WrapContainer;
