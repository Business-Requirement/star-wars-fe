import { ErrorType, ErrorActionType } from "../actions/errorAction";

export enum ErrorAction {
  ERROR = "ERROR", // error foward
  ERROR_CLEAR = "ERROR_CLEAR" // clear error
}

export interface ErrorDetail {
  errorType: ErrorType;
  errorCode?: number;
  info?: any;
}

export interface ErrorActionState {
  [key: string]: ErrorDetail;
}

const initialState: ErrorActionState = {};

const errorReducer = (state: ErrorActionState = initialState, action: ErrorActionType): ErrorActionState => {
  switch (action.type) {
    case ErrorAction.ERROR:
      return { ...state, [action.payload.name]: action.payload.detail };
    case ErrorAction.ERROR_CLEAR:
      state[action.payload].errorType = ErrorType.NONE; // NOITCE: i use mutable here so clear error will not trigger re-render
      return state;
    default:
      return state;
  }
};

export default errorReducer;
