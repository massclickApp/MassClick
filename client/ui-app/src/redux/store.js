import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import userClientReducer from './reducers/userClientReducer'
import locationReducer from './reducers/locationReducer.js'
import categoryReducer from './reducers/categoryReducer.js'
import businessListReducer from './reducers/businessListReducer.js'

const rootReducer = combineReducers({
  auth: authReducer,
    userReducer: userReducer,
    userClientReducer: userClientReducer,
    locationReducer: locationReducer,
    categoryReducer: categoryReducer,
    businessListReducer: businessListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
