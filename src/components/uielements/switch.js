// @flow
import React from "react";
import { Switch, Form } from "antd";
const FormItem = Form.Item;
type Props = {
  name: string,
  label: string,
  required?: boolean,
  getFieldDecorator: Function,
  disabled?: boolean,
  defaultChecked?: boolean,
  checkedChildren?: string,
  unCheckedChildren?: string,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any
};

function CustomSwitch(props: Props) {
  const {
    required,
    getFieldDecorator,
    label,
    name,
    disabled,
    defaultChecked,
    checkedChildren,
    unCheckedChildren,
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
  return (
    <FormItem label={label} {...layout}>
      {getFieldDecorator(name, {
        rules: [{ required: required, message: "This field is Required" }]
      })(
        <Switch
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
      )}
    </FormItem>
  );
}
CustomSwitch.defaultProps = {
  required: false,
  disabled: false
};
export default CustomSwitch;
