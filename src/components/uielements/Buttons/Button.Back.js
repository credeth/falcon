import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

type Props = {
  label: string,
  type?: ["primary", "plain", "success", "info", "warning", "error"]
};

function BackBtn(props: Props) {
  const classes = {
    default: "btn btn--primary",
    plain: "btn btn--plain",
    success: "btn btn--success",
    error: "btn btn--error",
    info: "btn btn--info",
    warning: "btn btn--warning",
    primary: "btn btn--primary"
  };
  return (
    <Button
      onClick={() => window.history.back()}
      className={classes[props.type] || classes.default}
    >
      {props.label}
    </Button>
  );
}

BackBtn.defaultProps = {
  label: "Back",
  type: "default"
};

export default BackBtn;
