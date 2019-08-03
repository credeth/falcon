import UI from "./_UI/reducer";
import Auth from "./Authentication/reducer";
import App from "./App/reducer";

const rootReducer = {
  UI,
  App,
  Auth
};
export default rootReducer;
