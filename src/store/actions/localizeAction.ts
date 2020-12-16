// import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { LocalizeAction } from "../reducers/localizeReducer";
import { IBaseAction, StoreType } from "store";
import { useDispatch, useStore, useSelector } from "react-redux";
import api from "api";
import { tokenizeString } from "utils";
import { ViewsData } from "mock-data/mock-all";

// action type define

export interface LocalizeAction_GetData extends IBaseAction {
  type: LocalizeAction.GET_DATA;
  payload: {
    view: string;
    page: string;
    lang: string;
    data: any;
  };
}

export interface LocalizeAction_ChangeLanguage extends IBaseAction {
  type: LocalizeAction.CHANGE_LANGUAGE;
  payload: {
    language: string;
  };
}

export interface LocalizeAction_SetPage extends IBaseAction {
  type: LocalizeAction.SET_PAGE;
  payload: {
    page: string;
  };
}

export type LocalizeActionType = LocalizeAction_GetData | LocalizeAction_ChangeLanguage | LocalizeAction_SetPage; // | any other action;

// action creator

export const localizeAction_changeLanguage = (language: string): LocalizeAction_ChangeLanguage => {
  return {
    type: LocalizeAction.CHANGE_LANGUAGE,
    payload: {
      language,
    },
  };
};

export const localizeAction_getData = (view: string, page: string, lang: string, path: string): ThunkAction<void, StoreType, undefined, LocalizeActionType> => async (dispatch) => {
  const data = await getLocalizeData(path);
  dispatch({
    type: LocalizeAction.GET_DATA,
    payload: {
      view,
      page,
      lang,
      data,
    },
  });
};

export const localizeAction_setPage = (view: string): LocalizeAction_SetPage => {
  return {
    type: LocalizeAction.SET_PAGE,
    payload: {
      page: view,
    },
  };
};

//////////////////////////// helper api ///////////////////////////////
const supportedContents: string[] = ["support-api-goes-here"];
export const getLocalizeData = async (path: string) => {
  if (supportedContents.indexOf(path) >= 0) {
    const response = await api.get(path, LocalizeAction.GET_DATA);
    return response.data;
  } else {
    // mock data
    return mockData(path);
  }
};

// FIXME: Must be remove mock dependent in Production
const mockData = (view: string) => {
  return (ViewsData as any)[view];
};

//////////////////////////// utils func ///////////////////////////////
export const selectDataTree = (data: any, path: string[]): any => {
  if (!data || !path || path.length === 0) return data;
  if (!data[path[0]]) return null;
  if (path.length === 1) return data[path[0]];

  return selectDataTree(data[path[0]], path.slice(1));
};

export const setDataTree = (root: any, data: any, path: string[]): void => {
  if (!path || path.length === 0) return;
  root[path[0]] = root[path[0]] || {};
  if (path.length === 1) root[path[0]] = data;
  setDataTree(root[path[0]], data, path.slice(1));
};

//////////////////////////// helper hooks //////////////////////////////

export const useLanguage = (language?: string) => {
  const store = useStore<StoreType>().getState();
  const dispatch = useDispatch();
  if (!language) {
    const saveLang = localStorage.getItem("language");
    language = saveLang ? saveLang : "en";
  }

  if (store.localize.language !== language) {
    // save to local
    localStorage.setItem("language", language);
    // dispatch change
    dispatch(localizeAction_changeLanguage(language));
  }
};

export const useLocalize = <T = any>(view: string, path: string = ""): T => {
  // tokenize view
  const viewPath = tokenizeString(view, ".");

  // select from store
  const store = useStore<StoreType>().getState().localize;
  const page = store.page;
  const lang = store.language;
  const resultData: T = useSelector<StoreType, any>((store) => {
    return selectDataTree(store.localize.active[page], viewPath);
  });

  const dispatch = useDispatch();
  if (!resultData && path) {
    dispatch(localizeAction_getData(view, page, lang, path));
  }

  return resultData;
};

export const useLocalizePage = (page: string, path: string) => {
  const dispatch = useDispatch();
  const store = useStore<StoreType>().getState().localize;
  const lang = store.language;
  // check for language set
  if (!lang) {
    console.error("Language is not set!!!");
    return;
  }
  dispatch(localizeAction_setPage(page));

  // load view data if not ready
  if (path && !store.data[lang]?.[page]) {
    dispatch(localizeAction_getData("", page, lang, path));
  }
};
