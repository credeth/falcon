import React from 'react';
import { Link } from 'react-router-dom';
import "./base.less"
import Topbar from "./topbar"
import BuildIcon from "../../../../image/hook.svg"
import ReactSVG from 'react-svg'

class FiveHundred extends React.Component {
  render() {
    return (
      <div className="info-page">
        <Topbar active="get-started"/>
        <div className="content">
            <div className="left">
                <div className="title">Get Started</div>
                <div className="desc">Occaecat duis ad ea sint eu cupidatat sint. Occaecat duis ad ea sint eu cupidatat sint. Occaecat duis ad ea sint eu cupidatat sint.</div>
            </div>
            <div className="right">
                <ReactSVG className="infographic" src={BuildIcon}/>
            </div>
        </div>
      </div>
    );
  }
}

export default FiveHundred;
