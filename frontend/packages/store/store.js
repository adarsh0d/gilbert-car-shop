import { createStore } from 'redux';
import createReducer from './reducer';
import connectMixin from '../utils/connect-mixin';

const store =  createStore(
    createReducer()
)
export default store;
export const connect = connectMixin(store);
