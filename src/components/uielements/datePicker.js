// @flow
import React from "react";
import { DatePicker, Form } from "antd";
import { Moment } from "moment";
const FormItem = Form.Item;
type Props = {
  name: string,
  label: string,
  format: string,
  required?: boolean,
  getFieldDecorator: Function,
  disabled?: boolean,
  defaultValue?: Moment,
  disabledDate?: any,
  monthPicker?: boolean,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any
};

function CustomDatePicker(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    defaultValue,
    disabled,
    format,
    disabledDate,
    monthPicker,
    horizontalLayout,
    labelCol,
    wrapperCol
  } = props;
  let layout = horizontalLayout
    ? {
        labelCol: labelCol || { span: 10, style: { textAlign: "left" } },
        wrapperCol: wrapperCol || { span: 14 }
      }
    : {};
  let picker = (
    <DatePicker
      format={format}
      disabled={disabled}
      disabledDate={disabledDate}
    />
  );
  if (monthPicker)
    picker = (
      <DatePicker.MonthPicker
        format={format}
        disabled={disabled}
        disabledDate={disabledDate}
      />
    );
  return (
    <FormItem label={label} {...layout}>
      {getFieldDecorator(name, {
        initialValue: defaultValue,
        rules: [{ required: required, message: "This field is Required" }]
      })(picker)}
    </FormItem>
  );
}
CustomDatePicker.defaultProps = {
  required: false,
  disabled: false
};
export default CustomDatePicker;
