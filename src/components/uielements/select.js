// @flow
import * as React from "react";
import { Select, Form, Spin } from "antd";
const FormItem = Form.Item;
type Props = {
  name: string,
  mode?: "multiple" | "tags" | "default",
  label: string,
  defaultValue: Array<string>,
  required?: boolean,
  getFieldDecorator: Function,
  disabled?: boolean,
  onSelect: Function,
  onDeselect: Function,
  loading: true | false,
  children: React.Node,
  style: any
};

function CustomInput(props: Props) {
  const {
    loading,
    required,
    getFieldDecorator,
    label,
    name,
    disabled,
    mode,
    onSelect,
    defaultValue,
    children,
    onDeselect,
    style
  } = props;
  if (required) {
    return (
      <Spin spinning={loading}>
        <FormItem label={label || name}>
          {getFieldDecorator(name, {
            rules: [{ required: true, message: "This field is Required" }]
          })(
            <Select
              style={style}
              mode={mode}
              disabled={disabled}
              onSelect={onSelect}
              onDeselect={onDeselect}
            >
              {props.children}
            </Select>
          )}
        </FormItem>
      </Spin>
    );
  } else {
    return (
      <Spin spinning={loading}>
        <FormItem label={label || name}>
          <Select
            style={style}
            mode={mode}
            disabled={disabled}
            defaultValue={defaultValue}
            onSelect={onSelect}
            onDeselect={onDeselect}
          >
            {props.children}
          </Select>
        </FormItem>
      </Spin>
    );
  }
}
CustomInput.defaultProps = {
  required: false,
  disabled: false,
  mode: "default",
  loading: false
};
CustomInput.Option = Select.Option;
export default CustomInput;
