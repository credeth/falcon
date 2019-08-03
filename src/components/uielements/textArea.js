// @flow
import React from "react";
import { Input, Form } from "antd";
const FormItem = Form.Item;
type Props = {
  name: string,
  label: string,
  required?: boolean,
  defaultValue: string,
  rows: number,
  getFieldDecorator: Function,
  disabled?: boolean,
  placeholder?: string,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any,
  style: React.CSSProperties
};

function CustomInput(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    defaultValue,
    disabled,
    rows,
    placeholder,
    horizontalLayout,
    labelCol,
    style,
    wrapperCol
  } = props;
  let layout = horizontalLayout
    ? {
        labelCol: labelCol || { span: 10, style: { textAlign: "left" } },
        wrapperCol: wrapperCol || { span: 14 }
      }
    : {};
  return (
    <FormItem {...layout} label={label}>
      {getFieldDecorator(name, {
        initialValue: defaultValue,
        rules: [
          {
            required: required,
            message: "This field is Required"
          }
        ]
      })(
        <Input.TextArea
          style={style}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
        >
          {defaultValue}
        </Input.TextArea>
      )}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  required: false,
  disabled: false,
  rows: 3
};
export default CustomInput;
