import React from "react";
import Todo from "../models/todo";

import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
  item: Todo;
  onRemoveTodo: () => void;
}> = (props) => {
  return (
    <li
      className={classes.item}
      key={props.item.id}
      onClick={props.onRemoveTodo}
    >
      {props.item.text}
    </li>
  );
};

export default TodoItem;
