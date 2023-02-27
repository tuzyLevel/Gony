import React, { CSSProperties } from "react";
import Card from "../Card/Card";

interface TitleProps extends React.PropsWithChildren {
  style: React.CSSProperties;
}

const Title = (props: TitleProps) => {
  return <Card style={props.style}>{props.children}</Card>;
};

export default Title;
