// @flow
import * as React from "react";
import { Select, Form, Spin } from "antd";
import "./styles/multiselect.less";

const FormItem = Form.Item;
type Props = {
  name: string,
  label: string,
  defaultValue: Array<string>,
  getFieldValue: Function,
  disabled?: boolean,
  onSelect: Function,
  onDeselect: Function,
  loading: true | false,
  children: React.Node
};

function CustomInput(props: Props) {
  const {
    loading,
    getFieldValue,
    label,
    name,
    disabled,
    onSelect,
    defaultValue,
    children,
    onDeselect
  } = props;
  return (
    <Spin spinning={loading}>
      <FormItem label={label || name}>
        <Select
          labelInValue
          mode="default"
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onSelect}
        >
          {children}
        </Select>
        <div className="multiselect-values-wrapper">
          <ul className="multiselect-values-list">
            {getFieldValue(name)
              ? getFieldValue(name).map((item, index) => {
                  return (
                    <li key={item.Id}>
                      {item.Name}&nbsp;&nbsp;
                      <span className="list-icon-close">
                        <i
                          className="ion-android-close"
                          onClick={() => onDeselect(item)}
                        />
                      </span>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </FormItem>
    </Spin>
  );
}
CustomInput.defaultProps = {
  disabled: false,
  loading: false
};
CustomInput.Option = Select.Option;
export default CustomInput;
