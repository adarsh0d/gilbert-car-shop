import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createReducer from './reducer';
import connectMixin from '../utils/connect-mixin';

const store =  createStore(
    createReducer(),
    applyMiddleware(thunk)
)
export default store;
export const connect = connectMixin(store);
