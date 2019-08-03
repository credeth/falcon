import React from "react";
import { Form, Select } from "antd";

const Option = Select.Option;
const FormItem = Form.Item;
type raValue = {
  value: string,
  label: string
};
type Props = {
  name: string,
  showSearch?: boolean,
  values: Array<raValue>,
  className: string,
  label: string,
  required?: boolean,
  getFieldDecorator?: Function,
  disabled?: boolean,
  validatorMessage?: string,
  placeholder?: string,
  defaultValue?: string,
  onSelect?: Function,
  selectedValue: string,
  rules: any,
  optionLabelProp?: string,
  horizontalLayout?: boolean,
  filterOption?:
    | boolean
    | ((inputValue: string, option: React.ReactElement<OptionProps>) => any),
  labelCol?: any,
  wrapperCol?: any,
  style?: any
};

function CustomInput(props: Props) {
  const {
    required,
    showSearch,
    getFieldDecorator,
    label,
    name,
    disabled,
    className,
    validatorMessage,
    values,
    placeholder,
    defaultValue,
    onSelect,
    filterOption,
    optionLabelProp,
    selectedValue,
    horizontalLayout,
    labelCol,
    rules,
    wrapperCol,
    style
  } = props;
  const crules = [{ required, message: validatorMessage }];
  if (rules) crules.push(rules);
  let layout = horizontalLayout
    ? {
        labelCol: labelCol || { span: 10, style: { textAlign: "left" } },
        wrapperCol: wrapperCol || { span: 14 }
      }
    : {};
  const _onSelect = (val, e) => onSelect(val, e.props.valObj, e);
  const defaultFilterOptions =
    showSearch && !filterOption
      ? (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      : null;
  if (!getFieldDecorator) {
    return (
      <Select
        showSearch={showSearch}
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        onSelect={_onSelect}
        optionLabelProp={optionLabelProp}
        placeholder={placeholder}
        filterOption={filterOption || defaultFilterOptions}
        style={style ? style : { width: "100%", maxWidth: 250 }}
      >
        {values.map((item, index) => (
          <Option
            key={index}
            label={item.label}
            value={item.value}
            valObj={item}
          >
            {item.label}
          </Option>
        ))}
      </Select>
    );
  }
  return (
    <FormItem label={label} {...layout}>
      {!getFieldDecorator ||
        getFieldDecorator(name, {
          rules: crules,
          initialValue: defaultValue
        })(
          <Select
            showSearch={showSearch}
            className={className}
            disabled={disabled}
            onSelect={onSelect}
            optionLabelProp={optionLabelProp}
            placeholder={placeholder}
            filterOption={filterOption || defaultFilterOptions}
            style={style ? style : { width: "100%" }}
          >
            {values.map((item, index) => (
              <Option
                key={index}
                label={item.label}
                value={item.value}
                valObj={item}
              >
                {item.label}
              </Option>
            ))}
          </Select>
        )}
    </FormItem>
  );
}
CustomInput.defaultProps = {
  size: "default",
  showSearch: false,
  required: false,
  getFieldDecorator: null,
  disabled: false,
  optionLabelProp: "label",
  validatorMessage: "This field is required"
};
export default CustomInput;
