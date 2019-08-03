import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./style.less";
import illustration from "../../../../image/illustration.png";
import { Button } from "antd";
import web3Obj from "utils/web3.helper";
import { login } from "redux/Authentication/actions";
import { connect } from "react-redux";
class Onboard extends Component {
  state = {
    current: 1
  };
  onChange = direction => {
    if (direction === "up") {
      this.slider.slickPrev();
    } else {
      this.slider.slickNext();
    }
  };
  componentDidMount() {
    // import("@toruslabs/torus-embed").then(() => {
    //   setTimeout(() => {
    //     web3Obj.setweb3();
    //   }, 1000);
    // });
  }
  onLoggedIn = account => {
    this.props.login(account);
    this.props.history.push("/dashboard");
  };
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
    const { current } = this.state;
    let self = this;
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: false,
      // focusOnSelect: true,
      vertical: true,
      centerMode: false,
      // className: "center",
      verticalSwiping: true,
      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
        self.setState({
          current: currentSlide
        });
      },
      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
    };
    return (
      <div className="home-page">
        <div className="topbar">
          <div className="left"></div>
          <div className="middle"></div>
          <div className="right">
            {/* <div className="brand-name">CREDETH</div> */}
            <div className="brand-actions">
              <Button size="large" type="primary" onClick={this.importTorus}>
                LOGIN
              </Button>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="illustration">
            <img src={illustration} />
          </div>
          <div className="menu-carousel">
            <Slider ref={r => (this.slider = r)} {...settings}>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(1)}>
                  What is CREDETH?
                </h3>
                <p>
                  Credeth is an open reputation protocol. The reputation in
                  credeth works like credit score and can be used to give an
                  idea of person's social standing without exposing their real
                  Identity. It aims to make onchain governance easier.
                </p>
                <Link to="/what" className="read-more">
                  read more
                </Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(3)}>Why?</h3>
                <p>
                  Reputation is a necessary part of the real world, but there is
                  no onchain global reputation source. Credeth enables
                  developers to implement Sybil protection and analyze someone's
                  credibility. For example, it can be used by a lending protocol
                  to lend money onchain by using reputation as a credit score.
                  It can also be used by a new dApp to airdrop their tokens and
                  for signaling/weighted voting.
                </p>
                <Link to="/why" className="read-more">
                  read more
                </Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(3)}>
                  How to use credeth in your dApp?
                </h3>
                <p>
                  All you need to do is call `getReputation` function of the
                  credeth smart contract and pass the user address as input. You
                  will get an integer number as output, which is the current
                  reputation of the user.
                </p>
                <Link to="/why" className="read-more">
                  read more
                </Link>
              </div>

              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(2)}>
                  How does it work?
                </h3>
                <p>
                  Just like real life, reputation on credeth heavily depends on
                  vouches given by other highly reputed people. Other than
                  vouches, reputation is earned by doing specific tasks. For
                  example, locking Ether into MakerDAO CDP earns one
                  reputation/day/ether.
                </p>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(2)}>Get Started?</h3>
                <p>
                  You don't necessarily need to do anything! You will
                  automatically earn or lose reputation based on actions you or
                  others take on dApps integrated with our platform. However, To
                  make the most out of credeth, click on login!
                </p>
                <Link to="/get-started" className="read-more">
                  read more
                </Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(0)}>
                  Build With CREDETH
                </h3>
                <p>
                  Fugiat dolor consequat labore ipsum ullamco magna labore
                  dolore et ea sint tempor.
                </p>
                <Link to="/build" className="read-more">
                  read more
                </Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(1)}>
                  What is CREDETH?
                </h3>
                <p>
                  Credeth is an open reputation protocol. The reputation in
                  credeth works like credit score and can be used to give an
                  idea of person's social standing without exposing their real
                  Identity. It aims to make onchain governance easier.
                </p>
                <Link to="/what" className="read-more">
                  read more
                </Link>
              </div>
            </Slider>
          </div>
          <div className="navigator">
            <div className="nav-btn" onClick={() => this.onChange("up")}>
              <i className="material-icons">arrow_upward</i>
            </div>
            <div className="nav-btn" onClick={() => this.onChange("down")}>
              <i className="material-icons">arrow_downward</i>
            </div>
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
)(Onboard);
