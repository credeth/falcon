// ApiUtils.js
import { parseInt } from "lodash";

export const statusMessages = {
  401: {
    status: 401,
    type: "UNAUTHORIZED_ACCESS",
    action: "UNAUTHORIZED_ACCESS",
    message: "Unauthorized Access!"
  },
  403: {
    status: 403,
    type: "FORBIDDEN_ACCESS",
    action: "FORBIDDEN_ACCESS",
    message: "Forbidden Access!"
  },
  440: {
    status: 440,
    type: "SESSION_EXPIRED",
    action: "SESSION_EXPIRED",
    message: "Session Expired!"
  }
};

export let checkStatus = response => {
  let error = null;
  let statusCode = parseInt(response.status);
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  if (statusCode === 400) {
    return response.json().then(err => {
      if (err && err.Code && err.Code === -1) {
        let error = new Error("Validation Error");
        error.payload = {
          type: "Validation Error",
          errors: err.Error
        };
        throw error;
      } else {
        let error = new Error("Bad Request");
        error.payload = {
          type: "Bad Request",
          errors: err.Errors
        };
        throw error;
      }
    });
  }
  if ([401, 403, 440].indexOf(statusCode) >= 0) {
    error = new Error(statusMessages[statusCode].message);
    error.status = statusCode;

    error.payload = {
      type: statusMessages[statusCode].type,
      errors: []
    };
    throw error;
  }

  error = new Error("Unknown Error");
  error.payload = {
    type: "Unknown Error",
    errors: []
  };
  throw error;
};

export let checkResponseCode = response => {
  // console.log('checkResponseCode : ', response);
  if (response.Code === 0) {
    return response;
  } else {
    let error = new Error(response.Message);
    error.payload = response;
    throw error;
  }
};
