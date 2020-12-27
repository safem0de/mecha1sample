import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';
import loadingReducer from './loadingReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    samples : sampleReducer,
    loading : loadingReducer,
    user : userReducer,
})

export default rootReducer;