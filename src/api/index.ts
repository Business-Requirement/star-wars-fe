import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import * as User from "./userApi";
import store from "store";
import { ErrorType, ErrorAction_Set } from "store/actions/errorAction";
import { ErrorAction } from "store/reducers/errorReducer";

const API_BASE_URL = window.APP_API_URL;

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  responseType: "json",
});

export { axiosInstance as axios };

const handleResponse = (response: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
  if (response.status !== 200) {
    const error = response.data.error || response.data.err;
    if (error) {
      store.dispatch<ErrorAction_Set>({
        type: ErrorAction.ERROR,
        payload: {
          name: response.config.name ? response.config.name : "unnamed",
          detail: {
            errorType: ErrorType.APP_ERROR,
            info: error,
          },
        },
      });
      return new Promise(() => {}); // cancel response turn out
    }
  }
  return response;
};

const handleError = (error: any) => {
  // dispatch connection error
  if (error.response && error.response.data && error.response.data.error) {
    // check if backend responecode != 200
    store.dispatch<ErrorAction_Set>({
      type: ErrorAction.ERROR,
      payload: {
        name: error.config.name ? error.config.name : "unnamed",
        detail: {
          errorType: ErrorType.APP_ERROR,
          errorCode: error.response.data.code,
          info: error.response.data.error,
        },
      },
    });
  } else {
    store.dispatch<ErrorAction_Set>({
      type: ErrorAction.ERROR,
      payload: {
        name: error.config.name ? error.config.name : "unnamed",
        detail: {
          errorType: ErrorType.CONNECTION_ERROR,
          info: error,
        },
      },
    });
  }

  return new Promise(() => {}); // cancel error turn out
};

// axios interceptor
axiosInstance.interceptors.response.use(handleResponse, handleError);

const API = {
  User: User,
};

export { API };

// extend axios config
declare module "axios" {
  export interface AxiosRequestConfig {
    name?: string;
  }
}

// helpfull api
/**
 * send get request to sever
 * @param url server url, if this is relative url, it will combine with base url set by API_BASE_URL
 * @param name request name, use to getback error if need
 * @param config request config
 */
const get = <T = any>(url: string, name: string, config?: AxiosRequestConfig | undefined) => {
  return axiosInstance.get<T>(url, { ...config, name });
};

/**
 * send post request to sever
 * @param url server url, if this is relative url, it will combine with base url set by API_BASE_URL
 * @param name request name, use to getback error if need
 * @param data request data
 * @param config request config
 */
const post = <T = any>(url: string, name: string, data?: any, config?: AxiosRequestConfig | undefined) => {
  return axiosInstance.post<T>(url, data, { ...config, name });
};

/**
 * send put request to sever
 * @param url server url, if this is relative url, it will combine with base url set by API_BASE_URL
 * @param name request name, use to getback error if need
 * @param data request data
 * @param config request config
 */
const put = <T = any>(url: string, name: string, data?: any, config?: AxiosRequestConfig | undefined) => {
  return axiosInstance.put<T>(url, data, { ...config, name });
};

/**
 * send delete request to sever
 * @param url server url, if this is relative url, it will combine with base url set by API_BASE_URL
 * @param name request name, use to getback error if need
 * @param config request config
 */
const _delete = <T = any>(url: string, name: string, config?: AxiosRequestConfig | undefined) => {
  return axiosInstance.delete<T>(url, { ...config, name });
};

const api = {
  get,
  post,
  put,
  delete: _delete,
};

export default api;
