export const actions = {
  LOG_IN_REQUEST: "LOG_IN_REQUEST",
  LOG_IN_SUCCESS: "LOG_IN_SUCCESS",
  LOG_IN_FAILED: "LOG_IN_FAILED",

  LOG_OUT_REQUEST: "LOG_OUT_REQUEST",
  LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
  LOG_OUT_FAILED: "LOG_OUT_FAILED",

  SESSION_EXPIRED: "SESSION_EXPIRED",
  UNAUTHORIZED_ACCESS: "UNAUTHORIZED_ACCESS",
  FORBIDDEN_ACCESS: "FORBIDDEN_ACCESS"
};

export const logInRequest = data => ({
  type: actions.LOG_IN_REQUEST,
  payload: data
});

export const logInSucess = data => ({
  type: actions.LOG_IN_SUCCESS,
  payload: data
});

export const logInFailed = error => ({
  type: actions.LOG_IN_FAILED,
  payload: error
});

export const logOutRequest = data => ({
  type: actions.LOG_OUT_REQUEST,
  payload: data
});

export const logOutSucess = data => ({
  type: actions.LOG_OUT_SUCCESS,
  payload: data
});

export const logOutFailed = error => ({
  type: actions.LOG_OUT_FAILED,
  payload: error
});

export const sessionExpired = () => ({
  type: actions.SESSION_EXPIRED
});
