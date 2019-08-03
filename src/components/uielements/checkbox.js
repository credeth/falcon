import React from "react";
import { Checkbox, Form } from "antd";

type Props = {
  name: string,
  defaultValue: string,
  label: string,
  style: any,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  rules: any,
  validatorMessage?: string
};

const FormItem = Form.Item;

function CustomCheckbox(props: Props) {
  const {
    required,
    defaultValue,
    getFieldDecorator,
    label,
    rules,
    validatorMessage,
    name,
    children,
    disabled,
    className,
    style
  } = props;

  const crules = [
    {
      required,
      message: validatorMessage
    }
  ];
  if (rules) crules.push(rules);
  return (
    <FormItem style={style} label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue,
          valuePropName: "checked"
        })(<Checkbox disabled={disabled}>{children}</Checkbox>)}
    </FormItem>
  );
}

export default CustomCheckbox;
