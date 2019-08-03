import api from "./Api/middleware";
import ui from "./_UI/middleware";
import authentication from "./Authentication/middleware";
export const errorCatch = ({ dispatch }) => next => action => {
  try {
    next(action);
  } catch (e) {
    console.log(e);
  }
};
const rootmiddleware = [
  errorCatch,
  ...api,
  ...ui,
  ...authentication,
];

export default rootmiddleware;
