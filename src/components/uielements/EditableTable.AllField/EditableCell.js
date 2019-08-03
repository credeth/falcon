import React from "react";

export default class EditableCell extends React.Component {
  render() {
    const {
      editing,
      onEdit,
      editable,
      form,
      record,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing && editable
          ? onEdit
            ? onEdit.render
            : restProps.children
          : restProps.children}
      </td>
    );
  }
}
