import { UserActionType } from "../actions/userAction";

export enum UserAction {
  GET_USERS = "GET_USERS", // get use list
  GET_USER = "GET_USER" // get single user info
}

// user info
export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserActionState {
  users: UserData[];
  user?: UserData;
}

const initialState: UserActionState = {
  users: [],
  user: undefined
};

const userReducer = (state: UserActionState = initialState, action: UserActionType) => {
  switch (action.type) {
    case UserAction.GET_USERS:
      return { ...state, users: action.payload };
    case UserAction.GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
