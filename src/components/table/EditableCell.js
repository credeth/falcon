import React from 'react'
import { Table, Input, Popconfirm, Select } from 'antd'
import {round, each} from 'lodash'

const Option = Select.Option

function EditableCell({ width, editable, value, onChange }) {
    var editinput;
    const input = <Input style={{fontSize: 12, width: width}} size="small" value={value} onChange={e => onChange(e.target.value)} />
    const textArea = <Input.TextArea style={{fontSize: 12, width: width}} value={value} onChange={e => onChange(e.target.value)} rows={6}/>
    editinput = textArea
    if(value.length > 50) editinput = textArea
    return (
        <div>
            { editable ? editinput  : <p style={{width: width}}>{value}</p> }
        </div>
    )
}

export default EditableCell