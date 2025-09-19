import axios from "axios";
import {
  FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAILURE
} from "../actions/userActionTypes.js";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORY_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_URL}/category/viewall`, {
      headers: { Authorization: `Bearer ${token}` },
    });


    let category = [];
    if (Array.isArray(response.data)) {
      category = response.data;
    } else if (response.data?.data) {
      category = response.data.data;
    } else if (response.data?.clients) {
      category = response.data.clients;
    }

    dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: category });
  } catch (error) {
    dispatch({
      type: FETCH_CATEGORY_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


export const createCategory = (categoryData) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_URL}/category/create`, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const category = response.data.data || response.data;

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: category });

    return category;
  } catch (error) {
    const errPayload = error.response?.data || error.message;
    dispatch({ type: CREATE_CATEGORY_FAILURE, payload: errPayload });
    throw error;
  }
};

