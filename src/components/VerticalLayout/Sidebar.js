import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Col, Button, Container, CardImg, CardText, Form, FormGroup, Input, Label, NavItem, NavLink, Row, TabContent, TabPane, CardTitle, Table } from "reactstrap"

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import logoLightPng from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/logo-light.svg";
import logoDark from "../../assets/images/logo-dark.png";
// import logoVm from "../../assets/images/WHITE.png"
import logoVm from "../../assets/images/PNG.png"

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              {/* <img src={logo} alt="" height="22" /> */}
            </span>
            <span className="logo-lg">
              {/* <img src={logoDark} alt="" height="17" /> */}
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoVm} alt="" height="30" style={{ marginLeft: "-17px" }} />
            </span>
            <span className="logo-lg">
              <div style={{marginTop:"8px"}}>  </div>
                <img src={logoVm} alt="" height="80" />
                {/* <h4 style={{ marginTop: "20px" }}>INFINIBAY</h4> */}
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
