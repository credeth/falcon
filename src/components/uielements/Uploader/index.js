import React from "react";
import FileSaver from "file-saver";
import { connect } from "react-redux";
import "./style.less";
import { Icon, message } from "../../../../node_modules/antd";
import { each } from "lodash";
type HeaderProp = {
  name: string,
  value: string
};
type UploadProps = {
  url: string,
  headers: Array<HeaderProp>,
  requestType: string,
  inputName: string,
  onComplete: Function
};
type DownloadProps = {
  url: string,
  headers: Array<HeaderProp>,
  requestType: string,
  body?: object,
  onComplete: Function
};
type DeleteProps = {
  url: string,
  body?: object,
  headers: Array<HeaderProp>,
  requestType: string,
  onComplete: Function,
  fileName: string
};
type Props = {
  title: string,
  desc: string,
  defaultFile: {
    name: string
  },
  noDelete: Boolean,
  deleteProps: DeleteProps,
  downloadProps: DownloadProps,
  uploadProps: UploadProps
};

class Uploader extends React.Component<Props> {
  state = {
    file: null,
    newFile: null,
    deleting: false,
    downloading: false
  };
  uploadFile = file => {
    const { uploadProps } = this.props;
    const { url, headers, requestType, inputName, onComplete } = uploadProps;
    const { newFile } = this.state;
    let xhr = new XMLHttpRequest();

    let formData = new FormData();
    formData.append(inputName, file);

    xhr.open(requestType, url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });

    xhr.onloadstart = e => {
      this.setState({
        newFile: { ...newFile, name: file.name, status: "uploading" }
      });
    };
    xhr.onload = e => {
      this.setState({
        newFile: { ...newFile, name: file.name, status: "done" }
      });
      onComplete();
    };

    let cnt = 0;

    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        console.log(e);
        var percentComplete = (e.loaded / e.total) * 100;
        //console.log(file.size, e.loaded, e.total);
        this.setState({
          newFile: {
            ...newFile,
            name: file.name,
            percent: percentComplete,
            status: "uploading"
          }
        });
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    };
    xhr.onerror = e => {
      message.error("Error Uploading!");
      this.setState({
        newFile: { ...newFile, status: "error" }
      });
    };
    xhr.onabort = e => {};
    xhr.send(formData);
  };
  removeFile = () => {
    const {
      url,
      headers,
      onComplete,
      requestType,
      body
    } = this.props.deleteProps;
    let xhr = new XMLHttpRequest();

    xhr.open(requestType, url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });

    xhr.onloadstart = e => {
      this.setState({ deleting: true });
    };
    xhr.onload = e => {
      const { newFile } = this.state;
      this.setState({
        file: null,
        newFile: null,
        deleting: false
      });
      onComplete();
    };
    xhr.onerror = e => {
      this.setState({ deleting: false });
    };
    if (requestType === "POST") {
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  };
  downloadFile = () => {
    const {
      url,
      headers,
      onComplete,
      requestType,
      body,
      fileName
    } = this.props.downloadProps;
    let xhr = new XMLHttpRequest();

    xhr.open(requestType, url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });
    xhr.responseType = "blob";

    xhr.onloadstart = e => {
      this.setState({ downloading: true });
    };
    xhr.onload = e => {
      if (xhr.status === 200) {
        FileSaver.saveAs(xhr.response, fileName);
      }
      this.setState({
        downloading: false
      });
      onComplete();
    };
    xhr.onerror = e => {
      this.setState({ downloading: false });
    };
    if (requestType === "POST") {
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  };
  onFileSelect = e => {
    console.log(e.target.files);
    if (e.target.files.length < 1) {
      return;
    }
    let files = e.target.files;
    // let formData = new FormData();
    // formData.append("uploadInput", files[0]);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    let filesize = (files[0].size / 1024 / 1024).toFixed(4); // MB
    if (filesize > 10) {
      message.error("File Size should not be greater that 10mb");
      return;
    }
    this.uploadFile(files[0]);
  };
  render() {
    const { title, defaultFile, desc, disabled, extra, noDelete } = this.props;
    const { newFile, deleting, downloading } = this.state;
    let fileItem = defaultFile;
    let status = "none";
    if (defaultFile) {
      status = "done";
    }
    if (newFile) {
      status = newFile.status;
      fileItem = newFile;
    }
    return (
      <div className="p-uploader">
        <div className="content">
          <div className="__header">
            <div className="title">
              {fileItem ? (
                <span className="icon">
                  <i className="material-icons">check_circle</i>
                </span>
              ) : null}
              {title}
            </div>
            <div className="file-item">
              <div className="__name" onClick={this.downloadFile}>
                {fileItem ? fileItem.name : null}
              </div>
              {status === "uploading" ? (
                <div
                  className="__progress"
                  style={{ width: fileItem ? fileItem.percent + "%" : 0 }}
                />
              ) : null}
            </div>
          </div>
          <div className="__footer">
            <div className="desc">
              {/* <div className="icon">
                <i className="material-icons">info</i>
              </div> */}
              {desc}
            </div>
          </div>
        </div>
        {extra ? <div className="extra">{extra}</div> : null}
        <div className="action-feedback">
          {status === "uploading" ? (
            <div className="feedback">
              <Icon type="loading" spin />
              <span className="progress-percent">
                {fileItem.percent ? fileItem.percent.toFixed(2) + "%" : null}
              </span>
            </div>
          ) : null}
          {status === "none" || status === "error" ? (
            <div className="upload-input">
              <div className="__btn">Upload Document</div>
              <input onChange={this.onFileSelect} type="file" />
            </div>
          ) : null}
          {status === "done" ? (
            <div className="actions">
              <div className="__item" style={{ color: "#003CF6" }}>
                {downloading ? (
                  <Icon type="loading" spin />
                ) : (
                  <Icon onClick={this.downloadFile} type="download" />
                )}
              </div>
              {!noDelete ? (
                <div className="__item" style={{ color: "red" }}>
                  {deleting ? (
                    <Icon type="loading" spin />
                  ) : (
                    <Icon onClick={this.removeFile} type="delete" />
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {/* <div className="__content">
          <Item label={this.state.newFile.name} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader);
