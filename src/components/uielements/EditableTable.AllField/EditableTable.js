import React from "react";
import { Form, Table, Button } from "antd";
import { TableProps } from "antd/lib/table/interface";
import { findIndex, each, pullAt, cloneDeep } from "lodash";
import uuid from "uuid";
import "./style.less";
import EditableRow from "./EditableRow";
import EditableCell from "./EditableCell";
export const EditableContext = React.createContext();

type Props = TableProps;

type ExtraTableProps = {};

type ExtraColProps = {
  onEdit: {
    render: (record, index, form) => any,
    defaultValue: ((record, index, form) => any) | string
  }
};

class EditableTable extends React.Component<Props> {
  state = {
    editing: false,
    data: null
  };
  table = null;
  editableTable = null;
  componentDidMount() {
    this.setState({
      data: cloneDeep(this.props.dataSource)
    });
    this.editableTable = {
      form: this.props.form,
      getData: () => this.getData(),
      refreshData: () => {
        this.setState({
          data: cloneDeep(this.props.dataSource)
        });
      },
      toggleEditing: (editing: boolean) => {
        if (editing) {
          this.setState({
            data: cloneDeep(this.props.dataSource),
            editing: editing
          });
        } else {
          this.setState({
            editing: !this.state.editing
          });
        }
      }
    };
  }
  getData = () => {
    const { form } = this.props;
    const { data } = this.state;
    let changedValues = form.getFieldsValue();
    each(changedValues, (vals, dataIndex) => {
      each(vals, (val, index) => {
        if (val !== undefined && data[index]) {
          data[index][dataIndex] = val;
        }
      });
    });
    this.setState({
      data: data
    });

    return data;
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
    const { form } = this.props;
    let index = this.getIndex(record);
    let data = [...this.state.data];
    if (record.isNew) {
      let oldData = form.getFieldsValue();
      let newData = each(oldData, vals => {
        return pullAt(vals, [index]);
      });
      pullAt(data, [index]);
      form.setFieldsValue(newData);
    } else {
      data[index].isDeleted = true;
    }
    this.setState({ data: data });
  };
  onAddRow = () => {
    const { columns } = this.props;
    const { data } = this.state;
    let newRow = {};
    newRow.Id = uuid();
    newRow.isNew = true;
    newRow.hasRemoveIcon = true;
    // each(columns, col => {
    //   newRow[col.dataIndex] = col.onEdit ? col.onEdit.defaultValue : undefined;
    // });
    // this.data = [...this.state.data, ...[newRow]];
    this.setState({
      data: data ? [...data, ...[newRow]] : [...[newRow]]
    });
    // if (onDataChange) onDataChange(this.data);
  };

  render() {
    const { form } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.props.columns.map(col => {
      if (!col.onEdit) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          form: form,
          onEdit: col.onEdit
            ? {
                render:
                  typeof col.onEdit.render === "function"
                    ? col.onEdit.render(record, this.getIndex(record), form)
                    : null
              }
            : {
                defaultValue: record[col.dataIndex]
              },
          dataIndex: col.dataIndex,
          rowKey: col.rowKey,
          title: col.title,
          editable: col.editable,
          index: this.getIndex(record),
          editing: this.state.editing
        }),
        render: (text, record, index) =>
          col.render ? col.render(text, record, index, form) : text
      };
    });
    if (this.state.editing)
      columns.push({
        width: 50,
        key: "action.delete",
        title: "",
        render: (_, record) => {
          if (record.hasRemoveIcon)
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
    let data = this.state.data;
    return (
      <EditableContext.Provider value={form}>
        <div className="p-editable-table">
          <Table
            ref={ref => (this.table = ref)}
            {...this.props}
            components={components}
            onRow={(record, index) => ({
              record,
              index
            })}
            bordered={this.props.bordered || true}
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
          />
        </div>
        {this.state.editing ? (
          <div style={{ paddingBottom: 16 }}>
            <Button
              size="small"
              className="btn btn--round"
              icon="plus"
              onClick={this.onAddRow}
            >
              Add
            </Button>
          </div>
        ) : null}
      </EditableContext.Provider>
    );
  }
}
const Wrapped = Form.create()(EditableTable);
Wrapped.EditableContext = EditableContext;

export default Wrapped;
