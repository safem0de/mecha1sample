import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';
import loadingReducer from './loadingReducer';
import userReducer from "./userReducer";
import chartReducer from './chartReducer';
import tableReducer from './tableReducer';

const rootReducer = combineReducers({
    samples : sampleReducer,
    loading : loadingReducer,
    user : userReducer,
    chart : chartReducer,
    table : tableReducer,
})

export default rootReducer;