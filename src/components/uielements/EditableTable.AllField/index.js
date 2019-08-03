import React from "react";
import { Form, Table, Button } from "antd";
import { Input } from "../index";
import { TableProps } from "antd/lib/table/interface";
import { findIndex, each, pullAt, cloneDeep } from "lodash";
import uuid from "uuid";
import "./style.less";

export const EditableContext = React.createContext();

const EditableRow = props => {
  let _props = { ...props };
  let _record = { ...props.record, _index: _props.index };
  _props.record = _record;
  if (props.record.isDeleted) return null;
  return (
    <EditableContext.Consumer>
      {form => <tr {..._props} />}
    </EditableContext.Consumer>
  );
};
const EditableFormRow = EditableRow;

class EditableCell extends React.Component {
  getInput = form => {
    const { input, dataIndex, index, onEdit } = this.props;
    if (onEdit.render) return onEdit.render;
    return (
      <Input
        name={`${dataIndex}[${index}]`}
        {...input}
        defaultValue={onEdit ? onEdit.defaultValue : undefined}
        getFieldDecorator={form.getFieldDecorator}
      />
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    const {
      alwaysRender,
      dataIndex,
      index,
      editing,
      record,
      onUpdateData
    } = this.props;
    if (alwaysRender) return true;
    if (editing) {
      let notSame =
        nextProps.form.getFieldValue(`${dataIndex}[${index}]`) !==
        record[dataIndex];
      if (notSame) {
        onUpdateData(
          index,
          dataIndex,
          nextProps.form.getFieldValue(`${dataIndex}[${index}]`)
        );
      }
      return notSame;
    } else {
      let res = true;
      return res;
    }
  }
  render() {
    const {
      editing,
      dataIndex,
      title,
      input,
      record,
      index,
      editable,
      form,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing && editable ? this.getInput(form) : restProps.children}
      </td>
    );
  }
}
type extraProps = {
  hideSave: boolean,
  hideCancel: boolean,
  onDataChange: (data: Array) => void,
  isEditing?: boolean,
  isSaving?: boolean,
  onEditTable?: () => any,
  onSave?: data => any
};

// type extraColProps = {
//   onEdit: {
//     render: (record, index, form) => any,
//     defaultValue: ((record, index, form) => any) | string
//   }
// };

type Props = TableProps & extraProps;
class EditableTable extends React.Component<Props> {
  state = {
    _isEditing: false,
    data: null
  };
  data = null;
  componentWillMount() {
    this.data = this.props.dataSource;
  }
  componentWillReceiveProps = nextProps => {
    const { _isEditing } = this.state;
    let { data } = this.state;
    const { isEditing } = nextProps;
    if (_isEditing && !isEditing) {
      this.setState({
        data: null,
        _isEditing: false
      });
    }
    if (isEditing && !_isEditing) {
      this.setState({
        _isEditing: true
      });
    }
  };
  getIndex = record => {
    let _rowKey = this.props.rowKey || "key";
    return findIndex(
      this.table ? this.table.getFlatData() : this.props.dataSource,
      {
        [_rowKey]: record[_rowKey]
      }
    );
  };
  onDeleteRow = record => {
    const { form, onDataChange } = this.props;
    let index = this.getIndex(record);
    let data = [...[], ...this.state.data];

    if (record.isNew) {
      let oldData = form.getFieldsValue();
      let newData = each(oldData, vals => {
        return pullAt(vals, [index]);
      });
      pullAt(data, [index]);
      // data[index].isDeleted = true;
      form.setFieldsValue(newData);
      this.setState({ data: data });
      return;
    }
    data[index].isDeleted = true;
    this.data = data;
    this.setState({ data: data });
    // if (onDataChange) onDataChange(this.data);
  };
  onAddRow = () => {
    const { columns, onDataChange } = this.props;
    let newRow = {};
    newRow.Id = uuid();
    newRow.isNew = true;
    newRow.removeIcon = true;
    each(columns, col => {
      newRow[col.dataIndex] = col.onEdit ? col.onEdit.defaultValue : undefined;
    });
    this.data = [...this.state.data, ...[newRow]];
    this.setState({
      data: [...this.state.data, ...[newRow]]
    });
    // if (onDataChange) onDataChange(this.data);
  };
  onEditTable = () => {
    this.data = this.props.dataSource;
    if (typeof this.props.onEditTable === "function") {
      this.setState({
        data: cloneDeep(this.props.dataSource),
        _isEditing: true
      });
      this.props.onEditTable();
    } else {
    }
  };
  onSave = () => {
    const { form } = this.props;
    const { data } = this.state;
    let changedValues = form.getFieldsValue();
    each(changedValues, (vals, dataIndex) => {
      each(vals, (val, index) => {
        if (val !== undefined) {
          data[index][dataIndex] = val;
        }
      });
    });
    this.data = data;
    this.setState(
      {
        data: data
      },
      () => {
        form.validateFields((err, vals) => {
          if (!err) {
            this.props.onSave(this.data, form);
          }
        });
      }
    );
  };
  onUpdateData = (index, dataIndex, value) => {
    const { onDataChange } = this.props;
    let data = [...[], ...this.state.data];
    if (!data) return;
    try {
      data[index][dataIndex] = value;
    } catch (e) {}
    this.data = data;
    // if (onDataChange) onDataChange(data);
  };
  render() {
    const { form, onEditTable } = this.props;
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
          form: form,
          onUpdateData: this.onUpdateData,
          alwaysRender: col.alwaysRender,
          onEdit: col.onEdit
            ? {
                render:
                  typeof col.onEdit.render === "function"
                    ? col.onEdit.render(record, this.getIndex(record), form)
                    : null,
                defaultValue:
                  typeof col.onEdit.defaultValue != "function"
                    ? col.onEdit.defaultValue || record[col.dataIndex]
                    : () =>
                        col.onEdit.defaultValue(
                          record,
                          this.getIndex(record),
                          form
                        )
              }
            : {
                defaultValue: record[col.dataIndex]
              },
          dataIndex: col.dataIndex,
          rowKey: col.rowKey,
          title: col.title,
          editable: col.editable,
          index: this.getIndex(record),
          editing: this.state._isEditing
        }),
        render: (text, record, index) =>
          col.render ? col.render(text, record, index, form) : text
      };
    });
    if (this.state._isEditing)
      columns.push({
        width: 50,
        key: "action.delete",
        title: "",
        render: (_, record) => {
          if (record.removeIcon)
            return (
              <i
                style={{ cursor: "pointer", color: "#bbb" }}
                className="material-icons"
                onClick={() => this.onDeleteRow(record)}
              >
                delete
              </i>
            );
          else {
            return null;
          }
        }
      });
    let data = this.state.data || cloneDeep(this.props.dataSource);
    return (
      <EditableContext.Provider value={form}>
        <div className="p-editable-table">
          <div className="table-header">
            <div className="left" />
            <div className="center" />
            {!this.state._isEditing ? (
              <div className="right">
                <Button icon="pen" onClick={this.onEditTable}>
                  Edit
                </Button>
              </div>
            ) : null}
            {this.state._isEditing ? (
              <div className="right">
                {/* <Button icon="plus" onClick={this.onAddRow}>
                  Add Row
                </Button> */}
                {!this.props.hideSave ? (
                  <Button
                    type="primary"
                    loading={this.props.isSaving}
                    onClick={this.onSave}
                  >
                    Save
                  </Button>
                ) : null}
                {!this.props.hideCancel ? (
                  <Button
                    icon="close"
                    type="danger"
                    onClick={() => {
                      if (typeof this.props.onCancelEditTable === "function") {
                        this.setState(
                          {
                            _isEditing: false,
                            data: null
                          },
                          () => this.props.onCancelEditTable()
                        );
                      } else {
                      }
                    }}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          <Table
            ref={ref => (this.table = ref)}
            {...this.props}
            components={components}
            onRow={(record, index) => ({
              record,
              index
            })}
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            footer={() => {
              return this.state._isEditing ? (
                <div className="right">
                  <Button icon="plus" onClick={this.onAddRow}>
                    Add
                  </Button>
                  {!this.props.hideSave ? (
                    <Button
                      type="primary"
                      loading={this.props.isSaving}
                      onClick={this.onSave}
                    >
                      Save
                    </Button>
                  ) : null}
                </div>
              ) : null;
            }}
          />
        </div>
      </EditableContext.Provider>
    );
  }
}
const Wrapped = Form.create()(EditableTable);
Wrapped.EditableContext = EditableContext;
export default Wrapped;
