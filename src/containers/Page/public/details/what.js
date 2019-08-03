import React from "react";
import { Link } from "react-router-dom";
import "./base.less";
import Topbar from "./topbar";
import BuildIcon from "../../../../image/ethereum.svg";
import ReactSVG from "react-svg";
class FiveHundred extends React.Component {
  
  render() {
    return (
      <div className="info-page info--what">
        <Topbar active="what" />
        <div className="content">
          <div className="left">
            <div className="title">What</div>
            <div className="desc">
              Credeth is an open reputation protocol. The reputation in credeth
              works like credit score and can be used to give an idea of
              person's social standing without exposing their real Identity. It
              aims to make onchain governance easier.
            </div>
          </div>
          <div className="right">
            <ReactSVG className="infographic" src={BuildIcon} />
          </div>
        </div>
      </div>
    );
  }
}

export default FiveHundred;
