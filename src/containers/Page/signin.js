import React from "react";
import { each } from "lodash";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Checkbox, Button, Form, Alert, notification } from "antd";
import { logInRequest as authenticate } from "../../redux/Authentication/actions";
import { removeErrors } from "../../redux/_UI/actions";
const FormItem = Form.Item;

class SignIn extends React.Component {
  state = {
    alertMessage: null
  };
  componentWillReceiveProps(nextProps) {
    const { UI, Auth, form, removeErrors } = nextProps;
    const { errors } = UI;
    const { setFields, getFieldValue } = form;
    if (errors.LOG_IN_FAILED) {
      let err = errors.LOG_IN_FAILED[0];
      //   message.error(err.description);
      if (err.errType == "field") {
        setFields({
          [err.payload.field]: {
            value: getFieldValue(err.payload.field),
            errors: [Error(err.description)]
          }
        });
      }
      removeErrors(["LOG_IN_FAILED"]);
    }
  }
  handleSignIn = e => {
    e.preventDefault();
    const { form, authenticate } = this.props;
    form.validateFields(["email", "password"], {}, (err, values) => {
      if (!err) {
        values.source = "agent";
        authenticate(values);
      }
    });
  };

  render() {
    const { isLoggedIn, location, isFetching } = this.props;
    const { getFieldDecorator } = this.props.form;

    if (isLoggedIn) {
      var toPath = { pathname: "/dashboard" };
      if (location.state) {
        toPath.pathname = location.state.from.pathname;
      }
      return <Redirect to={toPath} />;
    }

    return (
      <div className="isoSignInPage">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <img src="./images/PropelldAgent_New.png" height={40} />
            </Link>
          </div>
          {this.state.alertMessage ? (
            <Alert message={this.state.alertMessage} type="error" banner />
          ) : null}
          <br />
          <Form className="isoSignInForm">
            <div className="isoInputWrapper">
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      required: true,
                      message: "Please input your Email!"
                    }
                  ]
                })(<Input size="large" placeholder="Email" />)}
              </FormItem>
            </div>

            <div className="isoInputWrapper">
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    type="password"
                    size="large"
                    placeholder="Password"
                    onPressEnter={this.handleSignIn}
                  />
                )}
              </FormItem>
            </div>

            <div className="isoInputWrapper isoLeftRightComponent">
              <Checkbox>Remember me</Checkbox>
              <Button
                type="primary"
                onClick={this.handleSignIn}
                loading={isFetching}
              >
                Sign In
              </Button>
            </div>

            {/* <p className="isoHelperText">
              username: demo, password: demodemo, or Just click on any button.
            </p> */}

            <div className="isoCenterComponent isoHelperWrapper">
              {/* <Link to="/forgotpassword" className="isoForgotPass">
                Forgot Password
              </Link> */}
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { Auth, UI } = state;
  return {
    UI: UI,
    isFetching: UI.spinners.LOG_IN_REQUEST,
    isLoggedIn: Auth.isAuthenticated,
    errors: UI.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeErrors: errs => dispatch(removeErrors(errs)),
    authenticate: credentials => dispatch(authenticate(credentials))
  };
};

const Wrapped = Form.create()(SignIn);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapped);
