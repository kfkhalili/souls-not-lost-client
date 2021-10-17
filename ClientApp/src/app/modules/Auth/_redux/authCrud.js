import axios from "axios";
import {API} from "../../../../constants";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL ="api/auth/forgot-password";
export const RESET_PASSWORD_URL ="api/auth/resetpassword";

export const ME_URL = "api/me";
export function login(values) {
    // const formData = new FormData();
    // Object.keys(values).forEach((key) => {
    //     formData.append(key, values[key]);
    // });
    return axios.post(LOGIN_URL, values);
}
export function register(user) {
  return axios.post(REGISTER_URL, user);
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function resetPassword(payload) {
  return axios.post(RESET_PASSWORD_URL, payload);
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
