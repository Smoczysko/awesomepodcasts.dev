import React from "react";

import logo from "../../images/logo.svg";

import "./header.scss";

const Header = () => (
  <header>
    <div className="container">
      <div className="row" id="header-logo">
        <a href="/">
          <img src={logo} alt="Awesome Podcasts" />
        </a>
      </div>
      <div className="row">
        <div className="col-12" id="header-description">
          Awesome list of Important Podcasts for software engineers
        </div>
      </div>
    </div>
  </header>
);

export default Header;
