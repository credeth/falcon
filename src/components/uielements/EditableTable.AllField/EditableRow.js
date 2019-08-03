import React from "react";

export default class EditableRow extends React.Component {
  render() {
    const { record, ...restProps } = this.props;
    const { isDeleted, isDisabled, disabledRow } = record;
    if (isDeleted) return null;
    if (disabledRow) return disabledRow;
    if (typeof isDisabled === "boolean") {
      return <tr className="editable-row--disabled" {...restProps} />;
    } else {
      return <tr className="editable-row" {...restProps} />;
    }
  }
}
