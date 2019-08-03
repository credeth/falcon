import React, { Component } from "react";
import { Select, Tooltip } from "antd";
import Uploader from "./upload-input";
import { each, find } from "lodash";
import { TypesSubTypes, DocumentSubTypesMeta } from "./models";

class GenericUploader extends Component {
  onTypeChange = value => {
    this.props.onTypeChange(value);
  };
  render() {
    const {
      files = { front: null, back: null, multiples: [] },
      title,
      description,
      subType,
      documentType,
      removeBtn,
      defaultAccept,
      uploadProps
    } = this.props;

    let gridColumns = 2;
    let subTypeMeta = null;
    if (subType) {
      subTypeMeta = find(DocumentSubTypesMeta, { Id: subType });
      gridColumns = subTypeMeta.Front && subTypeMeta.Back ? 2 : 1;
      gridColumns =
        gridColumns === 2
          ? gridColumns
          : gridColumns + (subTypeMeta.Multiple ? 1 : 0);
    }

    let types = [];
    let foundSubTypes = TypesSubTypes[documentType];

    if (foundSubTypes) {
      each(foundSubTypes, st =>
        types.push(find(DocumentSubTypesMeta, { Id: st }))
      );
    }

    return (
      <div className="uploader-multiple">
        <div className="details-block">
          {/* <div className="icon">
            <i className="material-icons">description</i>
          </div> */}
          <div className="info">
            <div className="title">{title}</div>
            <div className="desc">{description}</div>
          </div>
          <div className="action">
            {foundSubTypes ? (
              <Tooltip
                title={
                  files.front || files.back || files.multiples.length > 0
                    ? "Remove existing files first in order to change the value."
                    : "Select Type."
                }
              >
                <Select
                  defaultValue={subTypeMeta ? subTypeMeta.Id : undefined}
                  placeholder="Select Document Type"
                  disabled={
                    files.front || files.back || files.multiples.length > 0
                  }
                  style={{ width: 250 }}
                  onChange={this.onTypeChange}
                >
                  {types.map(type => {
                    return (
                      <Select.Option key={type.Id} value={type.Id}>
                        {type.label}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Tooltip>
            ) : null}
          </div>
        </div>
        <div className="uploading-block">
          {subTypeMeta ? (
            <div
              className="upload-form form--two-document"
              style={{
                gridTemplateColumns: gridColumns === 2 ? "1fr 1fr" : "1fr"
              }}
            >
              {subTypeMeta.Front ? (
                <Uploader
                  removeBtn={removeBtn}
                  accept={subTypeMeta.Accept || defaultAccept}
                  uploadProps={{
                    url: uploadProps.url,
                    headers: uploadProps.headers,
                    requestType: "POST",
                    queryParams: {
                      ...uploadProps.queryParams,
                      SubType: subTypeMeta.Id,
                      IsFront: true
                    },
                    inputName: "documentUpload",
                    onComplete: uploadProps.onComplete
                  }}
                  defaultFile={
                    files.front
                      ? {
                          name: files.front.fileName
                        }
                      : null
                  }
                  deleteProps={files.front ? files.front.deleteOptions : null}
                  downloadProps={
                    files.front ? files.front.downloadOptions : null
                  }
                >
                  Upload Front Side (Image/PDF)
                </Uploader>
              ) : null}
              {subTypeMeta.Back ? (
                <Uploader
                  removeBtn={removeBtn}
                  accept={subTypeMeta.Accept || defaultAccept}
                  uploadProps={{
                    url: uploadProps.url,
                    headers: uploadProps.headers,
                    requestType: "POST",
                    queryParams: {
                      ...uploadProps.queryParams,
                      SubType: subTypeMeta.Id,
                      IsBack: true
                    },
                    inputName: "documentUpload",
                    onComplete: uploadProps.onComplete
                  }}
                  defaultFile={
                    files.back
                      ? {
                          name: files.back.fileName
                        }
                      : null
                  }
                  deleteProps={files.back ? files.back.deleteOptions : null}
                  downloadProps={files.back ? files.back.downloadOptions : null}
                >
                  Upload Back Side (Image/PDF)
                </Uploader>
              ) : null}
              {files.multiples.map(file => {
                return (
                  <Uploader
                    removeBtn={removeBtn}
                    defaultFile={{
                      name: file.fileName
                    }}
                    deleteProps={file.deleteOptions}
                    downloadProps={file.downloadOptions}
                  >
                    + Add More Documents (Image/PDF)
                  </Uploader>
                );
              })}
              {subTypeMeta.Multiple ? (
                <Uploader
                  removeBtn={removeBtn}
                  accept={defaultAccept}
                  uploadProps={{
                    url: uploadProps.url,
                    headers: uploadProps.headers,
                    requestType: "POST",
                    queryParams: {
                      ...uploadProps.queryParams,
                      SubType: subTypeMeta.Id,
                      Multiple: true,
                      Order:
                        files.multiples.length > 0
                          ? files.multiples[files.multiples.length - 1].Order +
                            1
                          : 0
                    },
                    inputName: "documentUpload",
                    onComplete: uploadProps.onComplete
                  }}
                >
                  + Add More Documents (Image/PDF)
                </Uploader>
              ) : null}
            </div>
          ) : null}
          <div
            className="upload-form form--two-document"
            style={{
              gridTemplateColumns: "1fr"
            }}
          >
            {!subTypeMeta
              ? files.multiples.map(file => {
                  return (
                    <Uploader
                      removeBtn={removeBtn}
                      defaultFile={{
                        name: file.fileName,
                        extra: file.extra
                      }}
                      deleteProps={file.deleteOptions}
                      downloadProps={file.downloadOptions}
                    >
                      + Add More Documents (Image/PDF)
                    </Uploader>
                  );
                })
              : null}
            {!foundSubTypes && !subTypeMeta ? (
              <Uploader
                removeBtn={removeBtn}
                accept={defaultAccept}
                uploadProps={{
                  url: uploadProps.url,
                  headers: uploadProps.headers,
                  requestType: "POST",
                  queryParams: {
                    ...uploadProps.queryParams,
                    SubType: 0,
                    Multiple: true,
                    Order:
                      files.multiples && files.multiples.length > 0
                        ? files.multiples[files.multiples.length - 1].Order + 1
                        : 0
                  },
                  inputName: "documentUpload",
                  onComplete: uploadProps.onComplete
                }}
              >
                + Add More Documents (Image/PDF)
              </Uploader>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default GenericUploader;
