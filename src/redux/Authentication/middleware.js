import { actions as types } from "./actions";
import { each } from "lodash";
import auth from "../../utils/authenticator";
import {
  showSpinner,
  hideSpinner,
  showError,
  addDoneActions
} from "../_UI/actions";
import { apiRequest } from "../Api/actions";
import service from "../../services/session";

export const logInFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === types.LOG_IN_REQUEST) {
    const rq = service.login(action.payload);
    dispatch(apiRequest(rq, types.LOG_IN_SUCCESS, types.LOG_IN_FAILED));
    dispatch(showSpinner(types.LOG_IN_REQUEST));
  }

  if (action.type === types.LOG_IN_SUCCESS) {
    auth.login(action.payload.token);
    dispatch(hideSpinner(types.LOG_IN_REQUEST));
    dispatch(addDoneActions(types.LOG_IN_SUCCESS));
  }
  if (action.type === types.LOG_IN_FAILED) {
    dispatch(hideSpinner(types.LOG_IN_REQUEST));
    if (action.payload && action.payload.Code) {
      let err = action.payload;
      if (err.Code === 4) {
        dispatch(
          showError(
            "field",
            "Credential Error",
            "Wrong password.",
            types.LOG_IN_FAILED,
            {
              field: "password"
            }
          )
        );
      }
      if (err.Code === 1 || err.Code === 2) {
        dispatch(
          showError(
            "field",
            "Failed Login",
            "Failed Login. Something Wrong happened.",
            types.LOG_IN_FAILED,
            {
              field: "password"
            }
          )
        );
      }
      if (err.Code === 6) {
        dispatch(
          showError(
            "field",
            "Not Authorized Error",
            "You are Not Authorised to access.",
            types.LOG_IN_FAILED,
            {
              field: "password"
            }
          )
        );
      }
      if (err.Code === 5) {
        dispatch(
          showError(
            "field",
            "Email Error",
            "Account isn't active. Please verify your email.",
            types.LOG_IN_FAILED,
            {
              field: "email"
            }
          )
        );
      }
      if (err.Code === 3) {
        dispatch(
          showError(
            "field",
            "Email Error",
            "Couldn't find your Propelld Account",
            types.LOG_IN_FAILED,
            {
              field: "email"
            }
          )
        );
      }
    }
  }
};

export const logOutFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === types.LOG_OUT_REQUEST) {
    auth.logOut();
    // dispatch(showSpinner());
    // dispatch({ type: types.LOG_OUT_SUCCESS });
  }

  if (action.type === types.LOG_OUT_SUCCESS) {
    dispatch(hideSpinner());
    dispatch(addDoneActions(types.LOG_OUT_SUCCESS));
  }
  if (action.type === types.LOG_OUT_FAILED) {
    dispatch(hideSpinner());
  }
};

export default [logInFlow, logOutFlow];
