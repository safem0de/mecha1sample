import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';
import loadingReducer from './loadingReducer';
import userReducer from "./userReducer";
import chartReducer from './chartReducer';

const rootReducer = combineReducers({
    samples : sampleReducer,
    loading : loadingReducer,
    user : userReducer,
    chart: chartReducer,
})

export default rootReducer;