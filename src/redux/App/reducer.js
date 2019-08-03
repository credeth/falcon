import { actions as types, getView } from "./actions";
const initState = {
  sidebar: {
    isCollapsed: window.innerWidth > 1600 ? false : true,
    currentKey: "dashboard.home",
    theme: "sidebar-theme--dark"
  },
  modal: null,
  modalEdited: false,
  view: getView(window.innerWidth),
  height: window.innerHeight
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case types.COLLPSE_CHANGE: {
      let sidebar = { ...state.sidebar };
      sidebar.isCollapsed = !sidebar.isCollapsed;
      return { ...state, sidebar: sidebar };
    }
    case types.TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height: height
        };
      }
      break;
    case types.CHANGE_OPEN_KEYS:
      return { ...state, openKeys: action.openKeys };
    case types.CHANGE_CURRENT: {
      let sidebar = { ...state.sidebar };
      sidebar.currentKey = action.current;
      return { ...state, sidebar: sidebar };
    }
    case types.OPEN_MODAL: {
      return { ...state, modal: action.payload, modalEdited: false };
    }
    case types.CLOSE_MODAL: {
      return { ...state, modal: null, modalEdited: false };
    }
    case types.TOGGLE_MODAL_EDITED: {
      return { ...state, modalEdited: true };
    }
    case "LOG_OUT": {
      return initState;
    }
    default:
      return state;
  }
  return state;
}
