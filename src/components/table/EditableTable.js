// @flow
import React from 'react'
import { Table, Popconfirm } from 'antd'
import EditableCell from './EditableCell'
import EditableSelect from './EditableSelect'
import './style.less'

type Col = {
    title: string,
    dataIndex: string,
    width: string,
    render: Function,
    type?: string,
    editableType?: string,
    selections?: Array<any>
}

type Props = {
    columns: Array<Col>,
    dataSource: Array<any>,
    bordered: boolean,
    onSave(record: Object): Function
}
type State = {
    data: any[],
    cachedData: any[]
}

class EditableTable extends React.Component<Props, State> {
    static defaultProps = {
        dataSource: []
    }
    state = {
        data: [],
        cachedData: []
    }

    componentWillMount() {
        const cached = this.props.dataSource.map(item => ({ ...item }))
        this.setState({
            data: this.props.dataSource,
            cachedData: cached
        })
    }

    componentWillReceiveProps(nextProps: Props) {
        const cached = nextProps.dataSource.map(item => ({ ...item }))
        this.setState({
            data: nextProps.dataSource,
            cachedData: cached
        })
    }

    manipulateColumns = (columns: Array<Col>) => {
        if (!(columns instanceof Array)) return columns;

        let newCol = columns.map((value, index) => {
            if (value.type !== 'editable' && !value.render) {
                value.render = (text, record) => <span style={{ width: value.width }}>{text}</span>
            }
            else if (value.type === 'editable') {
                switch (value.editableType) {
                    case 'selection': {
                        value.render = (text, record) => this.renderEditableSelect(
                            text, record,
                            value.dataIndex,
                            value.selections || [],
                            value.width
                        )
                        break
                    }
                    default: {
                        value.render = (text, record) => this.renderEditableInput(text, record, value.dataIndex, value.width)
                    }
                }
            }

            return value;
        })

        newCol.push({
            title: 'Actions',
            dataIndex: 'actions',
            width: '80px',
            render: (text: string, record: any) => {
                const { editable } = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                                    <a onClick={() => this.save(record.key)}>Save</a><br />
                                    <a onClick={() => this.cancel(record.key)}>Cancel</a>
                                </span>
                                : <span>
                                    <a onClick={() => this.edit(record.key)}>Edit</a><br />
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                        <a href="#">Delete</a>
                                    </Popconfirm>
                                </span>
                        }
                    </div>
                );
            },
        })
        return newCol;
    }
    renderEditableInput = (text: string, record: any, index: string, width: string) => {
        return (
            <EditableCell
                width={width}
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, index)}
            />
        );
    }
    renderEditableSelect = (values: Array<any>, record: any, index: string, selections: Array<any>, width: string) => {
        return (
            <EditableSelect
                width={width}
                editable={record.editable}
                values={values}
                selections={selections}
                onChange={value => this.handleChange(value, record.key, index)}
            />
        );
    }
    edit(key: string) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save(key: string) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            var cData = newData.map(item => ({ ...item }));
            this.setState({ data: newData, cachedData: cData });
        }
        this.props.onSave(target);
    }
    onDelete(key: string) {
        const target = [...this.state.data].filter(item => key === item.key)[0];
        const newData = [...this.state.data].filter(item => key !== item.key);
        if (target) {
            this.setState({ data: newData, cachedData: newData });
        }
    }
    cancel(key: string) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.state.cachedData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }

    handleChange = (value: string, key: string, column: string) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }
    render() {
        const { columns, dataSource, bordered, editing } = this.props
        const { data } = this.state
        return (
            <Table
                className="editable-table"
                bordered={bordered}
                dataSource={data}
                columns={this.manipulateColumns(columns)}
            />
        )
    }
}
export default EditableTable