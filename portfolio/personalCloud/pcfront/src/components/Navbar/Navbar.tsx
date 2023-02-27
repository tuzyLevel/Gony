//
import { Link, useNavigate } from "react-router-dom";

//
import axios from "axios";

//
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/loginSlice";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

//configuration
import { SERVER_URL } from "../../config";

//
import MenuItem from "./Menu/MenuItem";
import classes from "./Navbar.module.css";
import { SyntheticEvent } from "react";

/**
 * menues: string[]
 */
declare interface navbarProps extends React.PropsWithChildren {
  menues: Menu[];
  newNotice: boolean;
  newNoticeOffHandler: () => void;
  renderNoticeOnRightContent: () => void;
  renderBoxOnRightContent: () => void;
}

library.add(faHouse);

const Navbar = (props: navbarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutClickHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .get(`${SERVER_URL}/api/sign/logout`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const { RESPONSE_CODE, COMMENT } = res.data;
        if (RESPONSE_CODE === "LOGOUT_SUCCESS") {
          console.log(COMMENT);
          dispatch(logout());
          navigate("/");
        }
      });
  };

  const homeBtnClickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    props.renderBoxOnRightContent();
  };

  const noticeMenuClickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    props.renderNoticeOnRightContent();
  };

  return (
    <div className={classes.navbar}>
      <div className={`${classes.navbar_child} ${classes.navbar_home} `}>
        <Link to={"/box"} onClick={homeBtnClickHandler}>
          <FontAwesomeIcon icon="house" />
          <span>Home</span>
        </Link>
      </div>

      <ul className={`${classes.navbar_child} ${classes.navbar_menues}`}>
        {props.menues.map((menu: Menu) => {
          if (menu.title === "Logout")
            return (
              <MenuItem
                key={menu.title}
                title={menu.title}
                to={menu.to}
                onClick={logoutClickHandler}
              />
            );
          if (menu.title === "Notice") {
            return (
              <MenuItem
                key={menu.title}
                title={menu.title}
                to={menu.to}
                newNotice={props.newNotice}
                onClick={noticeMenuClickHandler}
                newNoticeOffHandler={props.newNoticeOffHandler}
              />
            );
          }
          return <MenuItem key={menu.title} title={menu.title} to={menu.to} />;
        })}
      </ul>
    </div>
  );
};

export default Navbar;
