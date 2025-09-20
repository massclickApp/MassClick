import {
  FETCH_BUSINESS_REQUEST, FETCH_BUSINESS_SUCCESS, FETCH_BUSINESS_FAILURE,
  CREATE_BUSINESS_REQUEST, CREATE_BUSINESS_SUCCESS, CREATE_BUSINESS_FAILURE,
  EDIT_BUSINESS_REQUEST, EDIT_BUSINESS_SUCCESS, EDIT_BUSINESS_FAILURE,
  DELETE_BUSINESS_REQUEST, DELETE_BUSINESS_SUCCESS, DELETE_BUSINESS_FAILURE
} from '../actions/userActionTypes';

const initialState = {
  businessList: [],
  loading: false,
  error: null,
};

export default function businessListReducer(state = initialState, action) {
  switch (action.type) {
    // 🔹 Common loading
    case FETCH_BUSINESS_REQUEST:
    case CREATE_BUSINESS_REQUEST:
    case EDIT_BUSINESS_REQUEST:
    case DELETE_BUSINESS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_BUSINESS_SUCCESS:
      return { ...state, loading: false, businessList: action.payload, error: null };

    case CREATE_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        businessList: [...state.businessList, action.payload],
        error: null,
      };

    case EDIT_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        businessList: state.businessList.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
        error: null,
      };

    case DELETE_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        businessList: state.businessList.filter((b) => b._id !== action.payload),
        error: null,
      };

    case FETCH_BUSINESS_FAILURE:
    case CREATE_BUSINESS_FAILURE:
    case EDIT_BUSINESS_FAILURE:
    case DELETE_BUSINESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
