import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer, { UserAction } from "./reducers/userReducer";
import errorReducer, { ErrorAction } from "./reducers/errorReducer";
import localizeReducer, { LocalizeAction } from "./reducers/localizeReducer";

const rootReducers = combineReducers({
  user: userReducer,
  error: errorReducer,
  localize: localizeReducer
});

export type StoreType = ReturnType<typeof rootReducers>;

const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;

// need to extend all action type here
type ActionBaseType = ErrorAction | UserAction | LocalizeAction;

export interface IBaseAction {
  type: ActionBaseType;
}
