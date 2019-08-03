import React from "react";
import { Link } from "react-router-dom";
import "./base.less";
import Topbar from "./topbar";
import BuildIcon from "../../../../image/customer.svg";
import ReactSVG from "react-svg";

class FiveHundred extends React.Component {
  render() {
    return (
      <div className="info-page info--why">
        <Topbar active="why" />
        <div className="content">
          <div className="left">
            <div className="title">Why</div>
            <div className="desc">
              Reputation is a necessary part of the real world, but there is no
              onchain global reputation source. Credeth enables developers to
              implement CIBIL protection and analyze someone's credibility. For
              example, it can be used by a lending protocol to lend money
              onchain by using reputation as a credit score. It can also be used
              by a new dApp to airdrop their tokens and for signaling/weighted
              voting.
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
