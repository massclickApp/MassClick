import {
  FETCH_USERSCLIENT_REQUEST, FETCH_USERSCLIENT_SUCCESS, FETCH_USERSCLIENT_FAILURE,
  CREATE_USERCLIENT_REQUEST, CREATE_USERCLIENT_SUCCESS, CREATE_USERCLIENT_FAILURE
} from "../actions/userActionTypes.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function userClientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERSCLIENT_REQUEST:
    case CREATE_USERCLIENT_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_USERSCLIENT_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };

    case CREATE_USERCLIENT_SUCCESS:
      return { ...state, loading: false, users: [...state.users, action.payload], error: null };

    case FETCH_USERSCLIENT_FAILURE:
    case CREATE_USERCLIENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

