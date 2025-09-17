import {
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
} from '../actions/userActionTypes.js';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, users: [...state.users, action.payload], error: null };
    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
