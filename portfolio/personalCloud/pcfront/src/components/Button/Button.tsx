import React, { SyntheticEvent } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  buttonName: string;
  className?: string;
  type?: "submit" | "button";
  form?: string;
  key?: string;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
} & React.PropsWithChildren;

const Button = (props: ButtonProps) => {
  const classNames = props
    .className!.split(" ")
    .map((name) => {
      return classes[name];
    })
    .join(" ");

  return (
    <button
      className={classNames}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      form={props.form ? props.form : ""}
    >
      {props.buttonName}
    </button>
  );
};

export default Button;
