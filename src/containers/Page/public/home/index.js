import React, { Component } from "react";
import Slider from "react-slick";
import {Link} from "react-router-dom"
import "./style.less";
import illustration from "../../../../image/illustration.png";
import { Button } from "antd";
export default class VerticalMode extends Component {
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
  render() {
    const { current } = this.state;
    let self = this;
    const settings = {
      dots: false,
      infinite: true,
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
          <div className="left">

          </div>
          <div className="middle">

          </div>
          <div className="right">
          {/* <div className="brand-name">CREDETH</div> */}
          <div className="brand-actions">
            <Button size="large" type="primary">LOGIN</Button>
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
                  Fugiat dolor consequat labore ipsum ullamco magna labore
                  dolore et ea sint tempor.
                </p>
                <Link to="/what" className="read-more">read more</Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(0)}>Build With CREDETH</h3>
                <p>
                  Fugiat dolor consequat labore ipsum ullamco magna labore
                  dolore et ea sint tempor.
                </p>
                <Link to="/build" className="read-more">read more</Link>

              </div>
              
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(2)}>Get Started?</h3>
                <p>
                  Fugiat dolor consequat labore ipsum ullamco magna labore
                  dolore et ea sint tempor.
                </p>
                <Link to="/get-started" className="read-more">read more</Link>
              </div>
              <div className="menu-card">
                <h3 onClick={() => this.slider.slickGoTo(3)}>Why?</h3>
                <p>
                  Fugiat dolor consequat labore ipsum ullamco magna labore
                  dolore et ea sint tempor.
                </p>
                <Link to="/why" className="read-more">read more</Link>
                
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
