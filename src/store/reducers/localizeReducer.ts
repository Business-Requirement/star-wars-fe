import { LocalizeActionType, setDataTree } from "../actions/localizeAction";
import { tokenizeString } from "utils";

export enum LocalizeAction {
  GET_DATA = "GET_DATA", // get data for page or view base on current language
  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  SET_PAGE = "SET_PAGE",
}

// action state type define
export interface LocalizeActionState {
  language: string; // current language
  page: string; // current page
  data: { [key: string]: any }; // data for all languages
  active: { [key: string]: any }; // current active page data base on language
}

// action initial state
const initialState: LocalizeActionState = {
  language: "",
  page: "",
  data: {},
  active: {},
};

const localizeReducer = (state: LocalizeActionState = initialState, action: LocalizeActionType): LocalizeActionState => {
  switch (action.type) {
    case LocalizeAction.GET_DATA: {
      const payload = action.payload;
      if (payload.view) {
        // data for view
        state.data[payload.lang][payload.page] = state.data[payload.lang][payload.page] || {};
        state.active[payload.page] = state.active[payload.page] || {};
        setDataTree(state.data[payload.lang][payload.page], payload.data, tokenizeString(payload.view, "."));
      } else {
        // data for page
        setDataTree(state.data[payload.lang], payload.data, tokenizeString(payload.page, "."));
      }
      if (state.page === payload.page && state.language === payload.lang) {
        payload.view
          ? setDataTree(state.active[payload.page], payload.data, tokenizeString(payload.view, "."))
          : setDataTree(state.active, payload.data, tokenizeString(payload.page, "."));
      }
      return { ...state };
    }
    case LocalizeAction.CHANGE_LANGUAGE: {
      if (state.language !== action.payload.language) {
        state.data[action.payload.language] = state.data[action.payload.language] || {}; // default lang data
        if (state.page) state.active[state.page] = state.data[action.payload.language]?.[state.page];
        return { ...state, language: action.payload.language };
      }
      return state;
    }
    case LocalizeAction.SET_PAGE: {
      const page = action.payload.page;
      state.active[page] = state.data[state.language]?.[page];
      return { ...state, page };
    }
    default:
      return state;
  }
};

export default localizeReducer;
