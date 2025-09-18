import axios from "axios";
import {
  FETCH_USERSCLIENT_REQUEST, FETCH_USERSCLIENT_SUCCESS, FETCH_USERSCLIENT_FAILURE,
  CREATE_USERCLIENT_REQUEST, CREATE_USERCLIENT_SUCCESS, CREATE_USERCLIENT_FAILURE
} from "./userActionTypes";

const API_URL = process.env.REACT_APP_API_URL;


export const getAllUsersClient = () => async (dispatch) => {
  dispatch({ type: FETCH_USERSCLIENT_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/userclient/viewall`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    let users = [];
    if (Array.isArray(response.data)) {
      users = response.data;
    } else if (response.data?.data) {
      users = response.data.data;
    } else if (response.data?.clients) {
      users = response.data.clients;
    }

    dispatch({ type: FETCH_USERSCLIENT_SUCCESS, payload: users });
  } catch (error) {
    dispatch({
      type: FETCH_USERSCLIENT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


export const createUserClient = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_USERCLIENT_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/userclient/create`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.data || response.data;

    dispatch({ type: CREATE_USERCLIENT_SUCCESS, payload: user });

    return user;
  } catch (error) {
    const errPayload = error.response?.data || error.message;
    dispatch({ type: CREATE_USERCLIENT_FAILURE, payload: errPayload });
    throw error;
  }
};

