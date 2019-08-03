// @flow
import React from "react";
import rules from "./input.rules";
import { Input, Form } from "antd";

const FormItem = Form.Item;
type Props = {
  name: string,
  defaultValue: string,
  className: string,
  type?: string,
  label: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  placeholder: string,
  size?: "small" | "middle" | "large",
  rules: any,
  validatorMessage?: string,
  onPressEnter?: Function,
  prefix: any,
  suffix: any,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any
};

function CustomInput(props: Props) {
  const {
    required,
    defaultValue,
    getFieldDecorator,
    label,
    name,
    type,
    disabled,
    className,
    placeholder,
    size,
    rules,
    validatorMessage,
    onPressEnter,
    prefix,
    suffix,
    horizontalLayout,
    labelCol,
    wrapperCol
  } = props;

  const crules = [
    {
      required: required,
      message: validatorMessage
    }
  ];
  let layout = horizontalLayout
    ? {
        labelCol: labelCol || { span: 10, style: { textAlign: "left" } },
        wrapperCol: wrapperCol || { span: 14 }
      }
    : {};
  if (rules) crules.push(rules);
  return (
    <FormItem {...layout} label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue
        })(
          <Input
            suffix={suffix}
            size={size}
            placeholder={placeholder}
            className={className}
            type={type}
            prefix={prefix}
            disabled={disabled}
            onPressEnter={onPressEnter}
          />
        )}
    </FormItem>
  );
}
CustomInput.rules = rules;
CustomInput.defaultProps = {
  size: "default",
  onPressEnter: null,
  required: false,
  type: "text",
  getFieldDecorator: null,
  disabled: false,
  horizontalLayout: false,
  validatorMessage: "This field is required"
};
export default CustomInput;
