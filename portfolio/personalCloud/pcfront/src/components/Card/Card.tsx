import React from "react";

interface CardProps extends React.PropsWithChildren {
  style: React.CSSProperties;
}

const Card = (props: CardProps) => {
  return (
    <div style={{ ...props.style, borderRadius: "10px" }}>{props.children}</div>
  );
};
export default Card;
