export const actions = {
  COLLPSE_CHANGE: "COLLPSE_CHANGE",
  COLLPSE_OPEN_DRAWER: "COLLPSE_OPEN_DRAWER",
  CHANGE_OPEN_KEYS: "CHANGE_OPEN_KEYS",
  TOGGLE_ALL: "TOGGLE_ALL",
  CHANGE_CURRENT: "CHANGE_CURRENT",
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL"
};

export const getView = width => {
  let newView = "MobileView";
  if (width > 1600) {
    newView = "LargeView";
  }
  if (width > 1220) {
    newView = "DesktopView";
  } else if (width > 767) {
    newView = "TabView";
  }
  return newView;
};

export const toggleCollapsed = windowSize => {
  return {
    type: actions.COLLPSE_CHANGE
  };
};
export const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== "LargeView";
  return {
    type: actions.TOGGLE_ALL,
    collapsed,
    view,
    height
  };
};
export const toggleOpenDrawer = () => {
  return {
    type: actions.COLLPSE_OPEN_DRAWER
  };
};
export const changeOpenKeys = openKeys => {
  return {
    type: actions.CHANGE_OPEN_KEYS,
    openKeys
  };
};
export const changeCurrent = current => {
  return {
    type: actions.CHANGE_CURRENT,
    current
  };
};
export const openModal = (name, props) => ({
  type: actions.OPEN_MODAL,
  payload: {
    modalName: name,
    modalProps: props
  }
});
export const closeModal = () => ({
  type: actions.CLOSE_MODAL
});
export const toggleModalEdited = () => ({
  type: actions.TOGGLE_MODAL_EDITED
});
