import axios from "axios";
import {
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
} from "./userActionTypes";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/user/viewall`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

export const createUser = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_USER_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/user/create`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.data || response.data;

    dispatch({ type: CREATE_USER_SUCCESS, payload: user });

    return user; 
  } catch (error) {
    const errPayload = error.response?.data || error.message;
    dispatch({ type: CREATE_USER_FAILURE, payload: errPayload });
    throw error; 
  }
};

