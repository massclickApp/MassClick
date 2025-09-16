import axios from 'axios';
import qs from 'qs'; 

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_OAUTH_CLIENT_SECRET; 
console.log("API_URL",API_URL)
console.log("CLIENT_ID",CLIENT_ID)
console.log("CLIENT_SECRET",CLIENT_SECRET)

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const data = qs.stringify({
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username,
      password,
    });

  const response = await axios.post(`${API_URL}/oauth/login`, data, {
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});


    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, accessToken, refreshToken },
    });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


// Logout
// authActions.js
// authActions.js
export const logout = (id) => async (dispatch) => {
  const token = localStorage.getItem("accessToken");

  try {
    if (token) {
      const url = id
        ? `${API_URL}/oauth/logout/${id}`
        : `${API_URL}/oauth/logout`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  }
};




