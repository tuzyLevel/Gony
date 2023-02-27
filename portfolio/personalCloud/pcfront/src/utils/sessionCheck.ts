import axios from "axios";

import { SERVER_URL } from "../config";

const path = SERVER_URL + "/api/session";

export const sessionCheck = async () => {
  return await axios.get(path, { withCredentials: true });
};
