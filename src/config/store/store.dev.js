import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import reducers from "../../redux/reducers";
import middlewares from "../../redux/middlewares";

var history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers
  }),
  composeEnhancers(applyMiddleware(...middlewares, thunk))
);

export { store, history };
