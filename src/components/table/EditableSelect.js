import React from 'react'
import { Table, Input, Popconfirm, Select } from 'antd'
import {round, each, find, filter} from 'lodash'

const Option = Select.Option

function EditableSelect({ editable, values, onChange, selections, width }) {
    const children = []
    const strValues = []
    var handleChange = onChange
    each(values, (item) => {
        let f = find(selections, {'value': item});
        if(f) strValues.push(f['label'])
    })
    each(filter(selections, (o) => !values.includes(o.value)) , (item, index) => children.push(<Option key={index} value={item.value + ''}>{item.label}</Option>))
    var editinput = (
        <Select
        style={{width: '100%', fontSize: 10}}
        mode="multiple"
        placeholder="Please select"
        value={strValues}
        onSelect={(value) => {
            // console.log(value, label);
            let v = [...values];
            v.push(parseInt(value))
            handleChange(v)
        }}
        onDeselect={(value) => {
            // console.log(value, label);
            let v = [...values]
            v.pop(parseInt(value))
            handleChange(v)
        }}
      >
        {children}
      </Select>
    )
    return (
        <div>
            { editable ?  editinput : <ul className="list" style={{width: width}}> {strValues.map((item, index) => <li key={index}>{item}</li>)} </ul> }
        </div>
    )
}

export default EditableSelect