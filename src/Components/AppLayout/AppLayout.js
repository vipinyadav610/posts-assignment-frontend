import React, { Component } from "react";
import Header from "Components/Header";
import PropTypes from "prop-types";
import { ContentRoute } from "../../routes";

class AppLayout extends Component {
  render() {
    return (
      <div>
        <Header />
        <ContentRoute />
      </div>
    );
  }
}

AppLayout.propTypes = {};

export default AppLayout;
