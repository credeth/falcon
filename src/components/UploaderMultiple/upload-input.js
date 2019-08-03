import React from "react";
import { message, Icon, Popconfirm } from "antd";
import FileSaver from "file-saver";
import { each } from "lodash";
import "./style.uploader.less";
type HeaderProp = {
  name: string,
  value: string
};

export type HttpProps = {
  url: string,
  queryParams: Array<HeaderProp>,
  headers: Array<HeaderProp>,
  requestType: "GET" | "POST",
  inputName?: string,
  body?: object,

  onComplete: Function
};

export type Props = {
  defaultFile: {
    name: string,
    extra?: any
  },
  maxFileSize: Number,
  accept: Array<String>,
  deleteProps: HttpProps,
  downloadProps: HttpProps,
  uploadProps: HttpProps
};

class Uploader extends React.Component<Props> {
  state = {
    newFile: null,
    deleting: false,
    downloading: false
  };
  uploadFile = file => {
    const { uploadProps } = this.props;
    const {
      url,
      headers,
      requestType,
      onComplete,
      queryParams,
      inputName
    } = uploadProps;
    const { newFile } = this.state;

    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append(inputName, file);
    let params = "";

    each(queryParams, (p, k) => {
      params = params + "&" + `${k}=${p}`;
    });

    xhr.open(requestType, url + "?" + params, true);

    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });
    xhr.onloadstart = e => {
      this.setState({
        newFile: { ...newFile, name: file.name, status: "uploading" }
      });
    };
    xhr.onload = e => {
      if (xhr.status === 200) {
        this.setState({
          // newFile: { ...newFile, name: file.name, status: "done" }
          newFile: null,
          status: "none"
        });
        message.success("Uploaded!");
        onComplete();
      } else {
        this.setState({
          // newFile: { ...newFile, name: file.name, status: "done" }
          newFile: null
        });
        message.error("Error Uploading!");
      }
    };
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        var percentComplete = (e.loaded / e.total) * 100;
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
      if (xhr.status === 200) {
        this.setState({
          newFile: null,
          deleting: false
        });
        message.success("Deleted!");
        onComplete();
      } else {
        this.setState({
          deleting: false
        });
        message.error("Failed Deleting!");
      }
    };
    xhr.onerror = e => {
      this.setState({ deleting: false });
      message.error("Failed Deleting!");
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
      message.error("Failed Downloading!");
    };
    if (requestType === "POST") {
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  };
  onFileSelect = e => {
    const { accept = [], maxFileSize = 10, onFileSelect } = this.props;
    if (e.target.files.length < 1) {
      return;
    }
    let files = e.target.files;
    let file = files[0];
    if (!file) return;
    let filesize = (file.size / 1024 / 1024).toFixed(4); // MB
    if (filesize > maxFileSize) {
      message.error("File Size should not be greater that 10mb");
      return;
    }
    if (accept && accept.length > 0 && !accept.includes(file.type)) {
      message.error("This File Type is not accepted");
      return;
    }
    let callback = err => {
      if (err) {
        e.target.value = null;
      } else {
        this.uploadFile(file);
      }
    };
    if (onFileSelect) {
      onFileSelect(callback);
    } else {
      this.uploadFile(file);
    }
  };
  render() {
    const { defaultFile, removeBtn = true } = this.props;
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
    // status = "done";
    // fileItem = {
    //   name: "asddaskldask.jpg",
    //   percent: 50
    // };
    return (
      <div className="pr-uploader">
        {status === "none" || status === "error" ? (
          <div className="uploader--while-upload">
            <div className="uploading-input">
              <div>{this.props.children}</div>
              <input
                ref={ref => (this.uploadInput = ref)}
                onChange={this.onFileSelect}
                type="file"
              />
            </div>
          </div>
        ) : null}
        {status === "uploading" ? (
          <div className="uploader--while-uploading">
            <div className="info">
              <div className="icon">
                <i className="material-icons">description</i>
              </div>
              <div className="label">{fileItem ? fileItem.name : null}</div>
              <div className="percentage">
                {fileItem
                  ? parseFloat(fileItem.percent || 0).toFixed(2) + "%"
                  : "0%"}
              </div>
            </div>
            <div
              className="progress-percent"
              style={{ width: fileItem ? fileItem.percent + "%" : 0 }}
            />
          </div>
        ) : null}
        {status === "done" ? (
          <div className="uploader--while-uploaded">
            <div className="info">
              <div className="icon">
                <i className="material-icons">description</i>
              </div>
              <div className="label">
                <div onClick={this.downloadFile}>
                  {fileItem ? fileItem.name : null}
                </div>
                <p> {defaultFile ? defaultFile.extra : null}</p>
              </div>
              <div className="actions">
                <div className="action" style={{ color: "#003CF6" }}>
                  {downloading ? (
                    <Icon type="loading" spin />
                  ) : (
                    <Icon onClick={this.downloadFile} type="download" />
                  )}
                </div>
                {removeBtn && (
                  <div className="action" style={{ color: "red" }}>
                    {deleting ? (
                      <Icon type="loading" spin />
                    ) : (
                      <Popconfirm
                        placement="left"
                        okText="Yes"
                        title="Are you sure you want to delete?"
                        onConfirm={this.removeFile}
                      >
                        <Icon type="delete" />
                      </Popconfirm>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Uploader.defaultProps = {};

export default Uploader;
