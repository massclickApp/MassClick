import {
  FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_FAILURE,
  CREATE_LOCATION_REQUEST, CREATE_LOCATION_SUCCESS, CREATE_LOCATION_FAILURE
} from '../actions/userActionTypes';

const initialState = {
  location: [],
  loading: false,
  error: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
    case CREATE_LOCATION_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LOCATION_SUCCESS:
      return { ...state, loading: false, location: action.payload, error: null };
    case CREATE_LOCATION_SUCCESS:
      return { ...state, loading: false, location: [...state.location, action.payload], error: null };
    case FETCH_LOCATION_FAILURE:
    case CREATE_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
