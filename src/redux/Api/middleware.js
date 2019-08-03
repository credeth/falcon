import { actions as types } from "./actions";
import {
  checkStatus,
  checkResponseCode,
  statusMessages
} from "../../utils/ApiUtils";
import { message } from "antd";

// this middleware care only for API calls
export const api = ({ dispatch }) => next => action => {
  if (action.type === types.API_REQUEST) {
    const { request, onSuccess, onError } = action.meta;
    fetch(request)
      .then(checkStatus)
      .then(checkResponseCode)
      .then(response => response.PayLoad)
      .then(data => dispatch({ type: onSuccess, payload: data }))
      .catch(error => {
        if (error instanceof Error) {
          if ([401, 403, 440].indexOf(error.status) >= 0) {
            dispatch({ type: statusMessages[error.status].action });
            message.error(statusMessages[error.status].message);
            dispatch({ type: onError, payload: error.payload });
          } else {
            dispatch({ type: onError, payload: error.payload });
          }
        } else {
          dispatch({ type: onError, payload: "Something Wrong Happened" });
        }
      });
  }
  return next(action);
};
export default [api];
