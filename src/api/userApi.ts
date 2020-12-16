import api from "./index";
import { UserData, UserAction } from "store/reducers/userReducer";

export const getUsersList = async () => {
  const response = await api.get<UserData[]>("users", UserAction.GET_USERS);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get<UserData>(`users/${id}`, UserAction.GET_USER);
  return response.data;
};
