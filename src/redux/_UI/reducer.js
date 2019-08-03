import types from "./actions";
import { pullAt, each } from "lodash";
import AgentUtils from "../../utils/AgentUtils";
const initUi = {
  profile: {
    name: AgentUtils.getName(),
    mobile: AgentUtils.getMobile()
  },
  spinners: {},
  errors: {},
  doneActions: {}
};

export default function reducer(state = initUi, action) {
  switch (action.type) {
    case types.SHOW_SPINNER: {
      let spinners = { ...state.spinners };
      let context = action.payload.context;
      if (!context) {
        spinners.global = true;
      }
      spinners[context] = true;
      return { ...state, spinners: spinners };
    }

    case types.HIDE_SPINNER: {
      let spinners = { ...state.spinners };
      if (!action.payload) {
        spinners = {};
        spinners.global = false;
      }
      if (action.payload) {
        if (typeof action.payload === "string") {
          spinners[action.payload] = false;
        }
        if (action.payload instanceof Array) {
          each(action.payload, key => {
            spinners[key] = false;
          });
        }
      }
      return { ...state, spinners: spinners };
    }

    case types.SHOW_ERROR: {
      let errors = { ...state.errors };
      let context = action.payload.context;
      if (!errors[context]) {
        errors[context] = [action.payload];
      } else {
        errors[context] = [...errors[context], action.payload];
      }
      return { ...state, errors: errors };
    }
    case types.UPDATE_AGENTS_PROFILE: {
      let profile = { ...state.profile };
      profile.name = action.payload.name;
      profile.mobile = action.payload.mobile;
      AgentUtils.setNameMobile(profile.name, profile.mobile);
      return { ...state, profile: profile };
    }
    case types.REMOVE_ERRORS: {
      let errors = { ...state.errors };
      if (!action.payload) {
        errors = {};
      }
      if (action.payload && action.payload instanceof Array) {
        each(action.payload, key => {
          delete errors[key];
        });
      }
      return { ...state, errors: errors };
    }

    case types.ADD_DONE_ACTIONS: {
      let doneActions = { ...state.doneActions };
      let context = action.payload;
      doneActions[context] = true;
      return { ...state, doneActions: doneActions };
    }
    case types.REMOVE_DONE_ACTIONS: {
      let doneActions = { ...state.doneActions };
      if (!action.payload) {
        doneActions = {};
      }
      if (action.payload && action.payload instanceof Array) {
        each(action.payload, key => {
          doneActions[key] = false;
        });
      }
      return { ...state, doneActions: doneActions };
    }
    default:
      return state;
  }
}
