import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon, Dropdown, Popover, Divider, Button } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { removeItem, getItem } from "Utils/Storage";
import "./Header.scss";

const { Header, Sider, Content, Footer } = Layout;

@withRouter
class AppHeader extends Component {
  onLogout = () => {
    removeItem("session-token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <Header className="header-wrapper">
        <div className="header-content">
          <div>logo</div>
          <div className="logout-wrapper">
            {getItem("session-token") ? (
              <div className="logout-content">
                <Button onClick={this.onLogout} type="primary">
                  Logout
                </Button>
              </div>
            ) : (
              <Fragment>
                <Button className="btn-login" type="primary">
                  Login
                </Button>
                <Button type="primary">Register</Button>
              </Fragment>
            )}
          </div>
        </div>
      </Header>
    );
  }
}

AppHeader.propTypes = {};

export default AppHeader;
