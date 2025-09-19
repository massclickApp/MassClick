import axios from "axios";
import {
  FETCH_BUSINESS_REQUEST, FETCH_BUSINESS_SUCCESS, FETCH_BUSINESS_FAILURE,
  CREATE_BUSINESS_REQUEST, CREATE_BUSINESS_SUCCESS, CREATE_BUSINESS_FAILURE
} from "../actions/userActionTypes.js";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllBusinessList = () => async (dispatch) => {
  dispatch({ type: FETCH_BUSINESS_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/businesslist/viewall`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    let businessList = [];
    if (Array.isArray(response.data)) {
      businessList = response.data;
    } else if (response.data?.data) {
      businessList = response.data.data;
    } else if (response.data?.clients) {
      businessList = response.data.clients;
    }

    dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: businessList });
  } catch (error) {
    dispatch({
      type: FETCH_BUSINESS_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


export const createBusinessList = (businessListData) => async (dispatch) => {
  dispatch({ type: CREATE_BUSINESS_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/businesslist/create`, businessListData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const businessList = response.data.data || response.data;

    dispatch({ type: CREATE_BUSINESS_SUCCESS, payload: businessList });

    return businessList;
  } catch (error) {
    const errPayload = error.response?.data || error.message;
    dispatch({ type: CREATE_BUSINESS_FAILURE, payload: errPayload });
    throw error;
  }
};

