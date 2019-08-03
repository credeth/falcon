import React from "react";
import { Link } from "react-router-dom";
import "./base.less";
import Topbar from "./topbar";
import BuildIcon from "../../../../image/hook.svg";
import ReactSVG from "react-svg";

class FiveHundred extends React.Component {
  render() {
    return (
      <div className="info-page info--build">
        <Topbar active="build" />
        <div className="content">
          <div className="left">
            <div className="title">Build</div>
            <div className="desc">
              Just like real life, reputation on credeth heavily depends on
              vouches given by other highly reputed people. Other than vouches,
              reputation is earned by doing specific tasks. For example, locking
              Ether into MakerDAO CDP earns one reputation/day/ether.
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
