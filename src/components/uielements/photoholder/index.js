import React from "react";
import auth from "../../../utils/authenticator";
import { Spin } from "antd";
import "./style.less";
type Props = {
  url?: string,
  onClick?: Function
};

class PhotoHolder extends React.Component<Props> {
  state = {
    isFetched: false,
    isFetching: false
  };
  componentWillMount() {
    const { url } = this.props;
    if (url) {
      this.getImg(url);
    }
  }
  componentWillReceiveProps(nextProps) {
    const newUrl = nextProps.url;
    const { url } = this.props;
    if (url !== newUrl) {
      this.getImg(newUrl);
    }
  }
  getImg = url => {
    this.setState({ isFetching: true });
    let req = new Request(url, {
      method: "GET",
      headers: new Headers({
        "x-access-token": auth.getToken()
      })
    });
    fetch(req)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw new Error("Error");
        }
      })
      .then(response => response.blob())
      .then(response => {
        console.log(response);
        this.setState({
          isFetched: true,
          isFetching: false
        });
        this.pic.src = URL.createObjectURL(response);
      })
      .catch(e => {
        this.setState({ isFetching: false });
        // console.log("Photo", e);
      });
  };
  render() {
    const { isFetched, isFetching } = this.state;
    return (
      <div onClick={this.props.onClick} className="p-passport-pic-holder">
        {isFetching ? <Spin spinning={true} /> : null}
        {!isFetched && !isFetching ? (
          <span style={{ textAlign: "center" }}>
            Upload Applicant Passport Size Picture
          </span>
        ) : null}
        {isFetched ? (
          <img
            width={140}
            height={190}
            ref={el => (this.pic = el)}
            alt="Picture"
          />
        ) : null}
        <div className="pic-holder-edit">
          <i className="icon ion-md-camera" />
        </div>
      </div>
    );
  }
}
PhotoHolder.defaultProps = {};
export default PhotoHolder;
