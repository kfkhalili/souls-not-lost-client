import * as _ from "loadsh"
import {API} from "../constants";

export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        (config) => {

            var data= store.getState();
            config.baseURL = `${API}api/handle`;

            const {
                auth: { token },
            } = data;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                // config.headers["Accept-Language"] = JSON.parse(localStorage.getItem("i18nConfig")||"{}") ?.selectedLang || "en";
                // config.headers["DEVICE_TYPE"] = localStorage.getItem("persist:v713-demo1-auth")
                // config.headers["USER"] = JSON.parse(localStorage.getItem("persist:v713-demo1-auth")||"{}").user?.phone|| "Desktop";

            }

            return config;
        },
        (err) => {
            Promise.reject(err);
        }
    );
    // Add a response interceptor
    axios.interceptors.response.use(
        function(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            response.notification = {
                success:undefined,
                failure:undefined
            }

            if (_.isObject(response.data)) {
                response.notification = response.data.message || "Request Succeeded";
            }else {
                response.notification =  "Request Succeeded";

            }
            return response;
        },
        function(error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            error.notification =  "Request Failed";

            if (error.response)
                if ([401, 403].includes(error.response.status) && !window.location.pathname.includes("auth/login") ) {
                    window.location = "/logout";
                }
            if(error.response?.data?.message > " "){
                error.message = error.response?.data?.message
            }

            return Promise.reject(error);
        }
    );
}
