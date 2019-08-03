import { session as _config } from "../config/service";
import { postRequest } from "./_helper";

class SessionService {
  static login = data => {
    return postRequest(_config.baseUrl, "agent/login", data);
  };
}

export default SessionService;
