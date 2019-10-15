import React from "react";
import { Link, withRouter } from "react-router-dom";

const Header = props => {
  return (
    <div className="header">
      <div>Menu</div>
      <div>Swap</div>
      <div>Wallet</div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
