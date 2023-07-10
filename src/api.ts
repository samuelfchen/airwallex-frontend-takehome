import axios from "axios";
import { config } from "./config";

export const axiosClient = axios.create({
  baseURL: config.API_URL.toString(),
  timeout: 5000,
  timeoutErrorMessage: "Request timed out.",
});
