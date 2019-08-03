import React from "react";
import { Icon } from "antd";
import FileSaver from "file-saver";
import "./style.less";
type HeaderProp = {
  name: string,
  value: string
};
type Props = {
  headers?: Array<HeaderProp>,
  url?: string,
  body?: object,
  requestType?: "GET" | "POST",
  onComplete?: Function,
  onFailed?: Function,
  fileName: string,
  label?: string
};

class DownloadLink extends React.Component<Props> {
  state = { spinning: false };
  onClick = () => {
    this.getSingleFile();
  };
  getSingleFile = () => {
    const { url, headers, fileName, onComplete, requestType, body } = this.props;
    let xhr = new XMLHttpRequest();
    xhr.open(requestType, url, true);
    headers.forEach(val => {
      xhr.setRequestHeader(val.name, val.value);
    });
    
    xhr.responseType = "blob";
    xhr.onloadstart = e => {
      this.setState({ spinning: true });
    };
    xhr.onload = e => {
      FileSaver.saveAs(xhr.response, fileName);
      this.setState({ spinning: false });
      onComplete();
    };
    xhr.onerror = e => {
      this.setState({ spinning: false });
    };
    if(requestType === "POST") {
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8')
      xhr.send(JSON.stringify(body))
    }
    else {

      xhr.send();
    }
  };
  render() {
    const { label } = this.props;
    return (
      <div onClick={() => this.onClick()} className="p-download-link">
        <span className="p-download-link__prefix">
            <Icon type="paper-clip" />
        </span>
        <span className="p-download-link__label">
        {label}
        </span>
        <span className="p-download-link__suffix">
          {this.state.spinning ? <Icon spin type="loading" /> : null}
        </span>
      </div>
    );
  }
}

DownloadLink.defaultProps = {
  onComplete: () => console.log("Downloaded!"),
  label: "Download",
  headers: [],
  requestType: "GET"
};

export default DownloadLink;
