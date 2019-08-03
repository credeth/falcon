import React from "react";
import { HttpProps } from "./upload-input";
import BankStatementUploader from "./bank-statement";
import GenericUploader from "./generic";
import "./style.less";

type Props = {
  title: String,
  defaultDate: String,
  defaultAccept: Array<String>,
  description: String,
  documentType: Number,
  documentSubType: Number,
  removeBtn: Boolean,
  uploadProps: HttpProps,
  files: {
    front: {
      fileName: String,
      downloadOptions: HttpProps,
      deleteOptions: HttpProps
    },
    back: {
      fileName: String,
      downloadOptions: HttpProps,
      deleteOptions: HttpProps
    },
    multiples: Arrray<{
      fileName: String,
      order: Number,
      downloadOptions: HttpProps,
      deleteOptions: HttpProps
    }>
  }
};
class UploaderMultiple extends React.Component<Props> {
  state = {
    subType: undefined
  };
  componentDidMount() {
    this.setState({
      subType: this.props.documentSubType
    });
  }
  onTypeChange = val => {
    this.setState({
      subType: val
    });
  };
  renderGeneric = () => {
    const {
      title,
      description,
      files,
      defaultAccept,
      defaultDate,
      documentSubType,
      documentType,
      removeBtn,
      uploadProps
    } = this.props;

    let { subType = documentSubType } = this.state;
    return (
      <GenericUploader
        title={title}
        removeBtn={removeBtn}
        description={description}
        files={files}
        defaultAccept={defaultAccept}
        subType={subType}
        documentType={documentType}
        uploadProps={uploadProps}
        onTypeChange={this.onTypeChange}
      />
    );
  };
  renderBankEStatement = () => {
    const {
      files,
      title,
      description,
      defaultAccept,
      defaultDate,
      documentSubType,
      documentType,
      removeBtn,
      uploadProps
    } = this.props;

    let { subType = documentSubType } = this.state;
    return (
      <BankStatementUploader
        title={title}
        description={description}
        removeBtn={removeBtn}
        files={files}
        defaultDate={defaultDate}
        documentType={documentType}
        defaultAccept={defaultAccept}
        subType={subType}
        uploadProps={uploadProps}
        onTypeChange={this.onTypeChange}
      />
    );
  };
  render() {
    const { documentType } = this.props;
    return (
      <React.Fragment>
        {documentType !== 6 ? this.renderGeneric() : null}
        {documentType === 6 ? this.renderBankEStatement() : null}
      </React.Fragment>
    );
  }
}
UploaderMultiple.defaultProps = {};
export default UploaderMultiple;
