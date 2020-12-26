import {combineReducers} from 'redux';
import sampleReducer from './sampleReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    samples : sampleReducer,
    loading : loadingReducer
})

export default rootReducer;