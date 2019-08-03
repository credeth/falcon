// @flow
import React from "react";
import { AutoComplete, Form } from "antd";
import { AntdTreeNodeAttribute } from "antd/lib/tree";
const FormItem = Form.Item;
type Props = {
  style: any,
  name: string,
  label: string,
  required?: boolean,
  getFieldDecorator: Function,
  disabled?: boolean,
  dataSource: any,
  filterOption: Function<inputVal, option>,
  horizontalLayout?: boolean,
  labelCol?: any,
  wrapperCol?: any
};

function CustomAutoComplete(props: Props) {
  const {
    style,
    required,
    getFieldDecorator,
    label,
    name,
    disabled,
    dataSource,
    filterOption,
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
    <FormItem label={label || name} {...layout}>
      {getFieldDecorator(name, {
        rules: [{ required: required, message: "This field is Required" }]
      })(
        <AutoComplete
          style={style}
          disabled={disabled}
          dataSource={dataSource}
          filterOption={filterOption}
        />
      )}
    </FormItem>
  );
}
CustomAutoComplete.defaultProps = {
  required: false,
  disabled: false
};
export default CustomAutoComplete;
