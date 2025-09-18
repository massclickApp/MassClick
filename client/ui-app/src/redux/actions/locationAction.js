import axios from "axios";
import {
  FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_FAILURE,
  CREATE_LOCATION_REQUEST, CREATE_LOCATION_SUCCESS, CREATE_LOCATION_FAILURE
} from "../actions/userActionTypes.js";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllLocation = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATION_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/location/viewall`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    let location = [];
    if (Array.isArray(response.data)) {
      location = response.data;
    } else if (response.data?.data) {
      location = response.data.data;
    } else if (response.data?.clients) {
      location = response.data.clients;
    }

    dispatch({ type: FETCH_LOCATION_SUCCESS, payload: location });
  } catch (error) {
    dispatch({
      type: FETCH_LOCATION_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


export const createLocation = (userData) => async (dispatch) => {
  dispatch({ type: CREATE_LOCATION_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/location/create`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.data || response.data;

    dispatch({ type: CREATE_LOCATION_SUCCESS, payload: user });

    return user;
  } catch (error) {
    const errPayload = error.response?.data || error.message;
    dispatch({ type: CREATE_LOCATION_FAILURE, payload: errPayload });
    throw error;
  }
};

