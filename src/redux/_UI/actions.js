export const actions = {
  SHOW_SPINNER: "SHOW_SPINNER",
  HIDE_SPINNER: "HIDE_SPINNER",

  SHOW_ERROR: "SHOW_ERROR",
  REMOVE_ERRORS: "REMOVE_ERRORS",

  ADD_DONE_ACTIONS: "ADD_DONE_ACTIONS",
  REMOVE_DONE_ACTIONS: "REMOVE_DONE_ACTIONS",

  UPDATE_AGENTS_PROFILE: "UPDATE_AGENTS_PROFILE"
};
export const showSpinner = (context = "global") => ({
  type: actions.SHOW_SPINNER,
  payload: { context }
});

export const hideSpinner = idxs => ({
  type: actions.HIDE_SPINNER,
  payload: idxs
});

export const toggleDoneAction = () => ({
  type: actions.TOGGLE_DONE_ACTION
});

export const showError = (
  errType,
  message,
  description,
  context = "global",
  payload
) => ({
  type: actions.SHOW_ERROR,
  payload: { errType, message, description, context, payload }
});

export const removeErrors = idxs => ({
  type: actions.REMOVE_ERRORS,
  payload: idxs
});

export const addDoneActions = action => ({
  type: actions.ADD_DONE_ACTIONS,
  payload: action
});

export const removeDoneActions = indexes => ({
  type: actions.REMOVE_DONE_ACTIONS,
  payload: indexes
});
export const updateAgentsProfile = data => ({
  type: actions.UPDATE_AGENTS_PROFILE,
  payload: data
});
export default actions;
