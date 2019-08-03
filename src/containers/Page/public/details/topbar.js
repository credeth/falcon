import React from 'react';
import { Link } from 'react-router-dom';
import "./base.less"

class Topbar extends React.Component {
  render() {
      const {active} = this.props
    return (
      <div className="topbar">
        <div></div>

        <div className="links">
            <div className={active === "what" ? "link link-active": "link"}>
                <Link to="/what">What</Link>
            </div>
            <div className={active === "why" ? "link link-active": "link"}>
                <Link to="/why">Why</Link>
            </div>
            <div className={active === "get-started" ? "link link-active": "link"}>
                <Link to="/get-started">Get Started</Link>
            </div>
            <div className={active === "build" ? "link link-active": "link"}>
                <Link to="/build">Build</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
