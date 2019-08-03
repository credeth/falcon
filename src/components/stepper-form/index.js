import React from "react";
import { Steps } from "antd";
import StepsPage from "./steps.page";
import { filter } from "lodash";
import "./style.less";

const Step = Steps.Step;

interface Props {
  current: number;
  progressDot: boolean;
}
export default class StepperForm extends React.Component<Props> {
  render() {
    const { children, current } = this.props;
    let currentPage = current || 0;
    const progressDot = this.props.progressDot ? true : false;
    if (children.length === undefined || children.length < 2) {
      console.error("More Than One Page Required");
      return null;
    }
    const pages = filter(
      children,
      item => item.type.displayName === "StepsPage"
    );
    if (pages.length < 2) {
      console.error("More Than One Page Required");
      return null;
    }
    if (currentPage >= pages.length) {
      console.error("Next page Not Available");
      currentPage = pages.length - 1;
    }
    if (currentPage < 0) {
      console.error("This is the 1st Page");
      currentPage = pages.length - 1;
    }
    return (
      <div className="stepper-form-wrapper">
        <div className="steps-wrapper">
          <Steps progressDot={progressDot} current={currentPage}>
            {pages.map((item, index) => (
              <Step
                key={index}
                title={item.props.title || `Step ${index + 1}`}
                description={item.props.description || ""}
              />
            ))}
          </Steps>
        </div>
        <div className="form-wrapper">
          {pages.map((item, index) => (
            <StepsPage
              key={index}
              {...item.props}
              active={index === currentPage}
            >
              {item.props.children}
            </StepsPage>
          ))}
        </div>
      </div>
    );
  }
}

StepperForm.Page = StepsPage;
