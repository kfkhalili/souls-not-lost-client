import axios from "axios";
import {API} from "../../../../constants";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL ="api/auth/forgot-password";

export const ME_URL = "api/me";
export function login(values) {
    // const formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //     formData.append(key, values[key]);
    // });
    return axios.post(LOGIN_URL, values);
}
export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
