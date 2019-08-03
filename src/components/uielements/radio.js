// @flow
import React from "react";
import { Form, Radio } from "antd";

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
type raValue = {
  value: string,
  label: string
};
type Props = {
  name: string,
  values: Array<raValue>,
  className: string,
  label: string,
  defaultValue: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  validatorMessage?: string,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any
};

function CustomInput(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    defaultValue,
    disabled,
    className,
    validatorMessage,
    values,
    horizontalLayout,
    labelCol,
    wrapperCol
  } = props;
  const crules = [{ required, message: validatorMessage }];
  let layout = horizontalLayout
    ? {
        labelCol: labelCol || { span: 10, style: { textAlign: "left" } },
        wrapperCol: wrapperCol || { span: 14 }
      }
    : {};
  return (
    <FormItem {...layout} label={label}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue
        })(
          <RadioGroup disabled={disabled}>
            {values.map((item, index) => (
              <Radio key={index} value={item.value}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        )}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  size: "default",
  required: false,
  getFieldDecorator: null,
  disabled: false,
  horizontalLayout: false,
  validatorMessage: "This field is required"
};
export default CustomInput;
