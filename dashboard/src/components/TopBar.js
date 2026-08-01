import React from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">22,486.30</p>
          <p className="percent up">+0.42%</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">74,186.30</p>
          <p className="percent up">+0.31%</p>
        </div>
      </div>

      <div className="topbar-actions">
        <Link to="/login" className="action-button">
          Login
        </Link>
        <Link to="/signup" className="action-button primary">
          Sign up
        </Link>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
