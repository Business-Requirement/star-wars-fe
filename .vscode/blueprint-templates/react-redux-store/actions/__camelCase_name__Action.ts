import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { {{pascalCase name}}ActionState, {{pascalCase name}}Action } from "../reducers/{{camelCase name}}Reducer";
import { IBaseAction, StoreType } from "store";

// action type define

export interface {{pascalCase name}}Action_Sample extends IBaseAction {
  type: {{pascalCase name}}Action.SAMPLE;
}

export type {{pascalCase name}}ActionType = {{pascalCase name}}Action_Sample; // | any other action;

// normal action

export const {{camelCase name}}Action_sampleNormal: ActionCreator<{{pascalCase name}}ActionType> = () => {
  return {
    type: {{pascalCase name}}Action.SAMPLE,
    payload: undefined
  };
};

// or 
export const {{camelCase name}}Action_sampleNormalOther = (): {{pascalCase name}}Action_Sample => {
  return {
    type: {{pascalCase name}}Action.SAMPLE,
    payload: undefined
  };
};


// thunk action

export const {{camelCase name}}Action_sampleThunk = (): ThunkAction<void, StoreType, undefined, {{pascalCase name}}ActionType> => async (dispatch) => {
  // do something async
  dispatch({
    type: {{pascalCase name}}Action.SAMPLE,
    payload: ''
  }) 
};

