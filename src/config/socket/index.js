import openSocket from "socket.io-client";
import { applications as service } from "../../config/service";
const socket = openSocket(`${service.baseUrl}`);

export { socket };
