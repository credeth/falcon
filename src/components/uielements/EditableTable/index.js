import React from "react";
import { Form, Table, Input, InputNumber, Button } from "antd";
import { TableProps } from "antd/lib/table/interface";
const FormItem = Form.Item;
export const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      required,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator, getFieldValues } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: required,
                        message: `Please Input ${title}!`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
type extraProps = {
  editingKey?: string,
  onAdd: Function
};
type Props = TableProps & extraProps;
export default class EditableTable extends React.Component<Props> {
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.props.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.props.rowKey
            ? record[this.props.rowKey] === this.props.editingKey
            : record.key === this.props.editingKey
        })
      };
    });
    return (
      <Table
        {...this.props}
        components={components}
        bordered
        dataSource={this.props.dataSource}
        columns={columns}
        rowClassName="editable-row"
        footer={
          this.props.editingKey == "" && this.props.onAdd
            ? () => (
                <div className="">
                  <Button onClick={this.props.onAdd} icon="plus" size="small" />
                </div>
              )
            : null
        }
      />
    );
  }
}
EditableTable.EditableContext = EditableContext;
