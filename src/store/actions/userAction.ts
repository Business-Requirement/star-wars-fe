// import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { API } from "api";
import { IBaseAction, StoreType } from "store";
import { UserData, UserAction } from "../reducers/userReducer";


export interface IGetUsersAction extends IBaseAction {
  type: UserAction.GET_USERS;
  payload: UserData[];
}

export interface IGetUserAction extends IBaseAction {
  type: UserAction.GET_USER;
  payload?: UserData;
}

export type UserActionType = IGetUsersAction | IGetUserAction;

// action creator

export const userAction_getUsers = (): ThunkAction<void, StoreType, undefined, UserActionType > => async (dispatch) => {
  let usersList = await API.User.getUsersList();
  dispatch({
    type: UserAction.GET_USERS,
    payload: usersList
  }) 
};

export const userAction_getUser = (userId: string): ThunkAction<void, StoreType, undefined, UserActionType> => async (dispatch) => {
    let user = await API.User.getUser(userId);
    dispatch({
      type: UserAction.GET_USER,
      payload: user
    })
}

//example for pure action creator
// export const getUserSample: ActionCreator<UserActionType> = () => {
//     return {
//         type: UserAction.GET_USER,
//         payload: undefined
//     }
// }
