import React from "react";
import { Link } from "react-router-dom";
import {Button} from "antd"
import "./base.less";
import Topbar from "./topbar";
import BuildIcon from "../../../../image/hook.svg";
import ReactSVG from "react-svg";
import web3Obj from "utils/web3.helper";
import { connect } from "react-redux";
import { login } from "redux/Authentication/actions";

class FiveHundred extends React.Component {
  onLoggedIn = (account) => {
    this.props.login(account);
    this.props.history.push("/dashboard")
  }
  importTorus = () => {
    this.enableTorus();
  };
  enableTorus = () => {
    setTimeout(() => {
      window.ethereum.enable().then(accounts => {
        web3Obj.setContractInstance();
        this.onLoggedIn(accounts[0]);
        // update store here ideally
      });
    }, 100);
  };
  render() {
    return (
      <div className="info-page info--get-started">
        <Topbar active="get-started" />
        <div className="content">
          <div className="left">
            <div className="title">Get Started</div>
            <div className="desc">
              You don't necessarily need to do anything! You will automatically
              earn or lose reputation based on actions you or others take on
              dApps integrated with our platform. However, To make the most out
              of credeth, click on login <br />
              <Button style={{color: "#fff", marginTop: 16}} size="large" type="ghost" onClick={this.importTorus}>
                LOGIN
              </Button>
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

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({
  login: address => dispatch(login(address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiveHundred);

