import { actions as types } from "./actions";
import {
  showSpinner,
  hideSpinner,
  showError,
  addDoneActions
} from "../_UI/actions";
export const updateProfileFlow = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === types.UPDATE_AGENTS_PROFILE) {
    dispatch(addDoneActions(types.UPDATE_AGENTS_PROFILE));
  }
};

export default [updateProfileFlow];
