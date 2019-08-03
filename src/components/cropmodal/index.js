import React from "react";
import { connect } from "react-redux";
import { Slider, Button, notification, Modal } from "antd";
import Cropper from "react-cropper";
// import Modal from "../modal/modal";

import "cropperjs/dist/cropper.css";
import "./style.less";
const src = "/assets/images/avatar.jpg";
type Props = {
  onCropped: Function,
  loading: Boolean,
  imgSrc: string
};
class CropperModal extends React.Component<Props> {
  state = {
    src: src,
    cropResult: null
  };

  componentWillMount() {
    const { imgSrc } = this.props;
    if (imgSrc) this.setState({ src: imgSrc });
  }

  useDefaultImage = () => {
    this.setState({
      src: src
    });
  };
  onChange = e => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  };
  onSliderChange = val => {
    if (val === 0) return;
    let zoomRatio = val > 0 ? 0.1 : -0.1;
    this.cropper.zoomTo(val / 100);
  };
  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.cropper
      .getCroppedCanvas({ width: 350, height: 450 })
      .toBlob(blob => this.props.onCropped(blob), "image/jpeg", 0.9);
  };
  render() {
    const { showModal, loading, imgSrc } = this.props;
    return (
      <Modal
        className="pp-cropper-modal"
        height="545px"
        width="450px"
        footer={false}
        onCancel={this.props.closeModal}
        visible={showModal}
        title="Choose Profile Picture"
      >
        <Cropper
          viewMode={2}
          dragMode="none"
          className="pp-cropper-container"
          aspectRatio={35 / 45}
          guides={false}
          src={this.state.src}
          background={false}
          allowTransparency={false}
          ref={cropper => {
            this.cropper = cropper;
          }}
        />
        <div className="pp-crop-actions">
          <div className="action-item">
            <Slider
              defaultValue={50}
              min={0}
              max={100}
              onChange={this.onSliderChange}
            />
          </div>
        </div>
        <div className="pp-crop-footer">
          <div className="left">
            <div className="file-input-wrapper">
              <label htmlFor="file">Choose a file</label>
              <input type="file" onChange={this.onChange} />
            </div>
          </div>
          <div className="right">
            <Button
              loading={loading}
              size="small"
              type="primary"
              className="btn btn--rounded"
              onClick={this.cropImage}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CropperModal);
