import { useSelector, useDispatch } from "react-redux";
import { ErrorAction, ErrorDetail } from "../reducers/errorReducer";
import { Dispatch } from "redux";
import { IBaseAction, StoreType } from "store";

export interface ErrorAction_Set extends IBaseAction {
  type: ErrorAction.ERROR;
  payload: {
    // error object {name, detail}
    name: string;
    detail: ErrorDetail;
  };
}

export interface ErrorAction_Clear extends IBaseAction {
  type: ErrorAction.ERROR_CLEAR;
  payload: string; // error name
}

export type ErrorActionType = ErrorAction_Set | ErrorAction_Clear;

export enum ErrorType {
  NONE = "NONE",
  CONNECTION_ERROR = "CONNECTION_ERROR",
  APP_ERROR = "APP_ERROR"
}

// get out the error if there have then clear it
export const useErrorChecker = (errorName: string): ErrorDetail | null => {
  const error = useSelector<StoreType, ErrorDetail>(state => state.error[errorName]);
  const dispatch = useDispatch<Dispatch<ErrorActionType>>();
  if (error && error.errorType !== ErrorType.NONE) {
    const catchError = { ...error };
    dispatch({
      type: ErrorAction.ERROR_CLEAR,
      payload: errorName
    });
    return catchError;
  }
  return null;
};
