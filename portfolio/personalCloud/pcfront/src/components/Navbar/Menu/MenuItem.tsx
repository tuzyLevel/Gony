import React from "react";
import { Link } from "react-router-dom";

import classes from "./MenuItem.module.css";

type MenuItemProp = {
  title: string;
  to: string;
  onClick?: (e: React.SyntheticEvent) => void;
  newNotice?: boolean;
  newNoticeOffHandler?: () => void;
} & React.PropsWithChildren;

const MenuItem = (props: MenuItemProp) => {
  return (
    <Link to={props.to} onClick={props.onClick}>
      {props.newNotice ? (
        <li
          className={`${classes.menu_item} ${classes.menu_item_notice__on}`}
          onClick={props.newNoticeOffHandler}
        >
          {props.title}
        </li>
      ) : (
        <li className={classes.menu_item}>{props.title}</li>
      )}
    </Link>
  );
};

export default MenuItem;
