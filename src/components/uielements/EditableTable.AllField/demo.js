import React from "react";
import EditableTable from "./EditableTable";
import { CustomSelect, Input } from "components/uielements";
import { Button, message } from "antd";

const EMITypes = {
  1: "Advance EMI",
  2: "Moratorium EMI",
  3: "Normal EMI"
};

class Test extends React.Component {
  columns = [
    {
      title: "EMI Type",
      width: 150,
      dataIndex: "EMIType",
      editable: true,
      render: (_, record) => <span>{EMITypes[record.EMIType]}</span>,
      onEdit: {
        render: (record, index, form) => (
          <CustomSelect
            required
            defaultValue={record.EMIType || 1}
            values={[
              {
                label: "Advance EMI",
                value: 1
              },
              {
                label: "Moratorium EMI",
                value: 2
              },
              {
                label: "Normal EMI",
                value: 3
              }
            ]}
            getFieldDecorator={form.getFieldDecorator}
            name={`EMIType[${index}]`}
          />
        )
      }
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      editable: true,
      onEdit: {
        defaultValue: 0,
        render: (record, index, form) => (
          <Input
            disabled={record.Manual === 0}
            required
            defaultValue={`${record.Amount || 0}`}
            rules={Input.rules.positiveFloat}
            getFieldDecorator={form.getFieldDecorator}
            name={`Amount[${index}]`}
          />
        )
      }
    },
    {
      title: "Number of Months",
      dataIndex: "NoOfMonths",
      editable: true,
      onEdit: {
        defaultValue: 0,
        render: (record, index, form) => (
          <Input
            required
            defaultValue={`${record.NoOfMonths || 0}`}
            rules={Input.rules.positiveFloat}
            getFieldDecorator={form.getFieldDecorator}
            name={`NoOfMonths[${index}]`}
          />
        )
      }
    }
  ];
  componentDidMount() {
    console.log(this.editableTable);
    this.editableTable.toggleEditing();
  }
  onSave = () => {
    this.editableTable.form.validateFields(err => {
      if (!err) {
        console.log(this.editableTable.getData());
      } else {
        message.error("Error in Some Fields!");
      }
    });
  };
  render() {
    return (
      <div style={{ padding: 128 }}>
        <EditableTable
          wrappedComponentRef={ref => {
            if (ref) this.editableTable = ref.editableTable;
            // console.log(ref);
          }}
          rowKey="Id"
          size="small"
          pagination={false}
          dataSource={[
            {
              Id: 1,
              EMIType: 1,
              Amount: 50,
              NoOfMonths: 23,
              hasRemoveIcon: true,
              disabledRow: (
                <tr style={{ borderBottom: "1px solid #ccc" }}>
                  <td colspan="100%" style={{ padding: 24 }}>
                    Application Id: 24 is in <b>Processing</b>
                  </td>
                </tr>
              )
            },
            {
              Id: 2,
              EMIType: 1,
              Amount: 50,
              NoOfMonths: 23,
              hasRemoveIcon: true,
              isDisabled: true
            }
          ]}
          columns={this.columns}
        />
        <Button onClick={this.onSave}>Save</Button>
      </div>
    );
  }
}

export default Test;
