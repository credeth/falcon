import React from "react";
import { Button, message } from "antd";
import FileSaver from "file-saver";
import jszip from "jszip";
import { each } from "lodash";
type HeaderProp = {
  name: string,
  value: string
};
type itemsProp = {
  url: string,
  fileName: string,
  method?: string,
  body?: Object
};
type Props = {
  disabled?: boolean,
  headers?: Array<HeaderProp>,
  items: itemsProp | Array<itemsProp>,
  onComplete?: Function,
  onFailed?: Function,
  fileName: string,
  label?: string,
  size: "small" | "default" | "large",
  type: "default" | "primary",
  icon: ""
};

const rqAsync = (url, headers, method = "GET", body = {}) => {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });
    xhr.responseType = "blob";
    xhr.onload = e => {
      if (xhr.status === 200) {
        res({
          response: xhr.response,
          fileName: getFileNameFromAttachment(xhr)
        });
      } else {
        message.error("Failed Downloading a file.");
        res(null);
      }
    };
    xhr.onerror = e => {
      rej(e);
    };
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  });
};

const getFileNameFromAttachment = xhr => {
  let filename = "";
  let disposition = xhr.getResponseHeader("Content-Disposition");
  if (disposition && disposition.indexOf("attachment") !== -1) {
    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    let matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  return filename;
};
class DownloadBtn extends React.Component<Props> {
  state = { spinning: false };
  onClick = () => {
    const { items } = this.props;
    // console.log(typeof items);
    if (items instanceof Array) {
      this.getAllFiles();
    } else {
      this.getSingleFile();
    }
  };
  getSingleFile = () => {
    const { items, headers, fileName, onComplete, onFailed } = this.props;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", items.url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });
    xhr.responseType = "blob";
    xhr.onloadstart = e => {
      this.setState({ spinning: true });
    };
    xhr.onload = e => {
      this.setState({ spinning: false });
      if (xhr.status === 200) {
        FileSaver.saveAs(xhr.response, fileName ? fileName : items.fileName);
        onComplete();
      } else {
        message.error("Failed Downloading!");
        onFailed();
      }
    };

    xhr.send();
  };
  getAllFiles = () => {
    const { items, fileName, headers, onComplete, onFailed } = this.props;
    const zip = new jszip();
    let promises = [];
    each(items, item => {
      promises.push(rqAsync(item.url, headers, item.method, item.body));
    });
    this.setState({ spinning: true });
    Promise.all(promises)
      .then(results => {
        results.map((result, index) => {
          if (!result) return;
          let itemFileName = items[index].fileName;
          let extension = result.fileName.split(".").pop();
          itemFileName = itemFileName.replace("{{ext}}", extension);
          zip.file(itemFileName, result.response, { binary: true });
        });
        zip.generateAsync({ type: "blob" }).then(blob => {
          FileSaver.saveAs(blob, fileName);
          this.setState({ spinning: false });
          onComplete();
        });
      })
      .catch(e => {
        // console.log(e);
        this.setState({ spinning: false });
        if (onFailed) {
          onFailed(e);
        }
      });
  };
  render() {
    const { label, size, icon, type, disabled } = this.props;
    return (
      <Button
        size={size}
        disabled={disabled}
        loading={this.state.spinning}
        onClick={() => this.onClick()}
        className="btn btn--plain"
        icon={icon}
        type={type}
      >
        {this.state.spinning ? "Downloading..." : label}
      </Button>
    );
  }
}

DownloadBtn.defaultProps = {
  onComplete: () => console.log("Downloaded!"),
  onFailed: () => console.log("Failed Downloading"),
  label: "Download",
  disabled: false,
  headers: []
};

export default DownloadBtn;
