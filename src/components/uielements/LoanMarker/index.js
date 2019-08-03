import React from "react";
import "./style.loanmarker.less";
type fieldProp = {
  span: number,
  text: string
};
type Props = {
  moratorium: fieldProp,
  emi: fieldProp
};
function LoanMarker(props: Props) {
  const { emi, moratorium } = props;
  let hasMoratorium = !!moratorium && moratorium.span > 0;
  return (
    <div className="loan-markers">
      <div className="marker-steps">
        {hasMoratorium ? (
          <span className="step-text" style={{ left: `${moratorium.span/2}%` }}>
            {moratorium.text}
          </span>
        ) : null}
        <span className="step-text" style={{ left: `${(emi.span/2) + moratorium.span}%` }}>
          {emi.text}
        </span>
      </div>
      <div className="emi-marker">
        <div
          className="moratorium-mark"
          style={{ width: moratorium.span + "%" }}
        />
        <div className="emi-mark" />
      </div>
    </div>
  );
}

export default LoanMarker;
