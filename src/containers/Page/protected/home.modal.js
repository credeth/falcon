import React, { Component } from "react";
import { connect } from "react-redux";
import lottie from "lottie-web";
import { Input } from "components/uielements";
import { Form, Button, message } from "antd";
import web3Obj from "utils/web3.helper";
import Auth from "utils/authenticator";

export class ModalContent extends Component {
  state = {
    success: false
  };
  onSuccess = () => {
    setTimeout(() => {
      this.setState({
        success: true
      });
    }, 10000);
  };
  componentDidMount() {
    const vouchIconAnim = lottie.loadAnimation({
      wrapper: document.getElementById("vouch-icon-anim"),
      animType: "svg",
      loop: true,
      path: "https://assets4.lottiefiles.com/temporary_files/kmXAVi.json"
    });
    const successIconAnim = lottie.loadAnimation({
      wrapper: document.getElementById("success-icon-anim"),
      animType: "svg",
      loop: true,
      path:
        "https://assets3.lottiefiles.com/datafiles/K6S8jDtSdQ7EPjH/data.json"
    });
    successIconAnim.setSpeed(0.6)
  }
  onVouch = () => {
    const { setFields, getFieldValue } = this.props.form;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.receiver);
        try {
          this.onSuccess();
          web3Obj
            .vouch(values.receiver, Auth.getToken())
            .then(rec => {
              console.log(rec);
              message.success(rec);
            })
            .catch(e => {
              console.log("Error", e);
              setFields({
                receiver: {
                  value: getFieldValue("receiver"),
                  errors: [Error("Invalid Address")]
                }
              });
            });
        } catch (e) {
          setFields({
            receiver: {
              value: getFieldValue("receiver"),
              errors: [Error("Invalid Address")]
            }
          });
        }
      }
    });
  };
  render() {
    return (
      <>
        <div
          style={{ display: this.state.success ? "flex" : "none" }}
          className="vouch-modal-content"
        >
          <div
            style={{ height: 200, marginBottom: -40 }}
            id="success-icon-anim"
          />
          <h2>Success!</h2>
        </div>

        <div
          style={{ display: !this.state.success ? "flex" : "none" }}
          className="vouch-modal-content"
        >
          <div
            style={{ height: 200, marginBottom: -40 }}
            id="vouch-icon-anim"
          />
          <h2>Receivers Address</h2>
          <Input
            required
            placeholder="0x5b792d02f1e3901af65a151ec7908a6e465554f4"
            getFieldDecorator={this.props.form.getFieldDecorator}
            name="receiver"
          />
          <Button
            style={{ margin: 16 }}
            type="primary"
            icon="like"
            onClick={this.onVouch}
          >
            Vouch{" "}
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ModalContent));
