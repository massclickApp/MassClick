import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
    userReducer: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
