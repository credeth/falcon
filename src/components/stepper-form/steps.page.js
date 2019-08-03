import React from "react";

function StepsPage(props) {
  const { active } = props;

  return (
    <div
      style={{ display: active ? "inherit" : "none" }}
      className="form-steps-page"
    >
      {props.children}
    </div>
  );
}
StepsPage.displayName = "StepsPage";
export default StepsPage;
