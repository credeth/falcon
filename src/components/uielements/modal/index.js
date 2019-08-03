import React from "react";
import { Modal, Button, Alert } from "antd";
import { isArray } from "lodash";
import { closeModal } from "../../../redux/App/actions";
import { store } from "../../../config/store";
import "./style.less";
type Props = {
  title: string,
  noHeader: boolean,
  footer: any,
  noFooter: boolean,
  onSave: Function,
  loading?: boolean,
  onSaveDisabled?: boolean,
  height?: string,
  errors?: Array | string | null,
  width?: number,
  cancelText?: string,
  className?: string,
  okText?: string,
  maskClosable?: boolean,
  closable?: boolean,
  fullscreen?: boolean
};
function CustomModal(props: Props) {
  const {
    fullscreen,
    errors,
    footer,
    cancelText,
    okText,
    closable,
    noHeader,
    noFooter,
    className,
    maskClosable
  } = props;
  let showError = null;
  if (isArray(errors)) {
    showError = errors.length > 0 ? errors.join(" | ") : null;
  }
  const title = [
    <div className="fl-modal-header">
      <div className="title">{props.title}</div>
      {closable ? (
        <div
          className="close-action"
          onClick={() => store.dispatch(closeModal())}
        >
          <i className="material-icons">close</i>
        </div>
      ) : null}
    </div>
  ];
  const _footer = [
    <Button
      size="small"
      key="submit"
      type="primary"
      disabled={props.onSaveDisabled}
      loading={props.loading}
      onClick={props.onSave}
    >
      {okText}
    </Button>
  ];
  return (
    <Modal
      width={fullscreen ? "100%" : props.width}
      className={
        (className ? "fl-modal " + className : "fl-modal") +
        (fullscreen ? " fl-modal-fullscreen" : "")
      }
      wrapClassName="fl-modal-wrapper"
      title={noHeader ? null : title}
      maskClosable={maskClosable}
      onCancel={() => store.dispatch(closeModal())}
      closable={false}
      visible
      bodyStyle={{ height: fullscreen ? "100vh" : props.height }}
      maskStyle={{ background: "#202b5782" }}
      footer={noFooter ? null : footer || _footer}
    >
      {!showError || (
        <Alert type="error" message="Error" description={showError} banner />
      )}
      {!showError || <br />}
      {props.children}
    </Modal>
  );
}

CustomModal.defaultProps = {
  fullscreen: false,
  errors: null,
  loading: false,
  noHeader: false,
  onSaveDisabled: false,
  height: "420px",
  width: 640,
  okText: "Save",
  cancelText: "Cancel",
  closable: true,
  maskClosable: false
};

export default CustomModal;
