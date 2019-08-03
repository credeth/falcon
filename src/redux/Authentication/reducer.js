import auth from "../../utils/authenticator";
import { actions as types } from "./actions";
import { omit as _omit } from "lodash";
const initState = {
  isAuthenticated: auth.isLoggedIn()
};

export default function sessionReducer(state = initState, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case types.LOG_OUT_REQUEST: {
      return { ...state, isAuthenticated: false };
    }
    case types.UNAUTHORIZED_ACCESS: {
      return { ...state };
    }
    case types.SESSION_EXPIRED: {
      auth.logOut();
      return { ...state, isAuthenticated: false };
    }
    default:
      return state;
  }
}
