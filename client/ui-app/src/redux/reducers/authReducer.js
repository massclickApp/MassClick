  import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    RELOGIN_REQUEST,
    RELOGIN_SUCCESS,
    RELOGIN_FAILURE
  } from '../actions/authAction.js';

  const initialState = {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
  };

  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
      case RELOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
      case RELOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          error: null,
        };
      case LOGIN_FAILURE:
      case RELOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LOGOUT:
        return { ...initialState };
      default:
        return state;
    }
  }
