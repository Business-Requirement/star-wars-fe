import { {{pascalCase name}}ActionType } from "../actions/{{camelCase name}}Action";

export enum {{pascalCase name}}Action {
  SAMPLE = "SAMPLE",
}

// action state type define
export interface {{pascalCase name}}ActionState {
    
}

// action initial state
const initialState: {{pascalCase name}}ActionState = {
    
}

const {{camelCase name}}Reducer = (state: {{pascalCase name}}ActionState = initialState, action: {{pascalCase name}}ActionType): {{pascalCase name}}ActionState => {
  switch(action.type) {
    case {{pascalCase name}}Action.SAMPLE:
      return state;
    default:
      return state;
  }
}

export default {{camelCase name}}Reducer;