import React from "react";
import { InputNumber, Form } from "antd";
const FormItem = Form.Item;
type Props = {
  name: string,
  min?: number,
  max?: number,
  step?: number | string,
  defaultValue?: number,
  onChange?: (value: number | string | typeof undefined) => void,
  disabled?: boolean,
  size?: "large" | "small" | "default",
  formatter?: (value: number | string | typeof undefined) => string,
  parser?: (displayValue: string | typeof undefined) => number,
  label: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
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
    getFieldDecorator,
    label,
    name,
    min,
    max,
    step,
    formatter,
    parser,
    disabled,
    onChange,
    defaultValue,
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
      required,
      message: validatorMessage
    }
  ];
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
          <InputNumber
            disabled={disabled}
            min={min}
            max={max}
            formatter={formatter}
            parser={parser}
            onChange={onChange}
            prefix={prefix}
            step={step}
            onPressEnter={onPressEnter}
          />
        )}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  required: false,
  disabled: false,
  validatorMessage: "This field is Required."
};
export default CustomInput;
