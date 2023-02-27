import classes from "./Error.module.css";

const Error = () => {
  return (
    <div className={classes.error_container}>
      <div className={classes.error_content}>404 Page is not found!</div>
    </div>
  );
};

export default Error;
