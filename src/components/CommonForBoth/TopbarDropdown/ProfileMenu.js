import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";
import { GET_USER_BY_ID } from "gqlOprations/Queries";
import { useMutation, useQuery } from "@apollo/client"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState("Admin");

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  const getCookies = (cname) => {
    const e = document.cookie.split("; ")
    let result = null
    e.forEach(element => {
      if (element.indexOf(cname) == 0) {
        result = element.substring(cname.length + 1)
      }
    })
    return result;
  }
  const mvid = getCookies("MvUserId");
  const mvtoken = getCookies("MvUserToken");

  const { loading, data, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        id: mvid,
        token: mvtoken
      }
    }
  });

  const handleLogOut = () => {
    document.cookie = "MvUserType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "MvUserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "MvUserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/login")
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={data && data ? ("http://167.99.36.48:3003/" + data.getUserByID.User_Image.split("app/")[1]) : null}
            alt="Header Avatar"
          />
          {/* <span className="d-none d-xl-inline-block ms-2 me-1">{data && data ? (data.getUserByID.Email):null}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" /> */}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <div style={{display:"flex", justifyContent:"center"}}>
          <p> User Name </p>
          </div>
          <div style={{display:"flex", justifyContent:"center"}}>
          <p> Admin </p>
          </div> */}

          {/* <div className="dropdown-divider" /> */}

          <DropdownItem tag="a" href="/userprofile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>

          {/* <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Wallet")}
          </DropdownItem> */}
          {/* <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-16 align-middle me-1" />
            {props.t("Settings")}
          </DropdownItem> */}

          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-question-mark font-size-16 align-middle me-1" />
            {props.t("Heed Help")}
          </DropdownItem>

          <div className="dropdown-divider" />
          <Button style={{display:"inline", border:"0px", backgroundColor:"transparent" , marginLeft:"15px"}} onClick={handleLogOut} >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span style={{color:"white"}}> LogOut </span>
          </Button>        
          </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
